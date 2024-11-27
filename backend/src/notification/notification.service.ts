import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Notification from './notification.entity';
import { Repository } from 'typeorm';
import { CreateNotificationParams } from 'src/utils/types';
import { UsersService } from 'src/users/users.service';
import User from 'src/users/user.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly userService: UsersService,
  ) {}

  async markAsRead(userId: string, id: string) {
    console.log('marking');
    const notification = await this.notificationRepository.findOne({
      where: [{ id: id }, { user: { id: userId } }],
      relations: ['user'],
    });
    console.log(notification.id, id);
    if (!notification) {
      throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
    }
    notification.markAsRead = true;
    const newNotification = await this.notificationRepository.save(
      notification,
    );
    await this.userService.updatelastReadNotification(userId, newNotification);
    return newNotification.id;
  }

  async create(params: CreateNotificationParams) {
    const { user, heading, content, type, relatedUser } = params;
    // console.log(params);
    const newNotification = this.notificationRepository.create(params);
    // const targetUser = await this.userService.getById(user.id);
    // console.log(newNotification);
    // targetUser.lastUnReadNotification = newNotification;
    await this.userService.updatelastReadNotification(user.id, newNotification);
    return await this.notificationRepository.save(newNotification);
  }

  async delete(userId: string, notificationId: string) {
    console.log(userId, notificationId);
    const targetNotification = await this.notificationRepository.findOne({
      where: {
        id: notificationId,
        user: { id: userId },
      },
    });
    if (!targetNotification) {
      throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
    }
    const user = await this.userService.getById(userId);
    let newLastReadNotification: Notification;
    if (user.lastReadNotification == notificationId) {
      newLastReadNotification = await this.getOneNotificationJustCreatedAhead(
        targetNotification,
        user,
      );
      await this.userService.updatelastReadNotification(
        user.id,
        newLastReadNotification,
      );
    }
    const deleteResponse = await this.notificationRepository.delete(
      targetNotification.id,
    );
    if (!deleteResponse.affected) {
      throw new HttpException(
        'Cannot delete notification',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (newLastReadNotification) {
      return newLastReadNotification.id;
    }
  }

  async getOneNotificationJustCreatedAhead(
    targetNotification: Notification,
    user: User,
  ) {
    // const targetNotification = await this.getById(id);
    const newNotification = await this.notificationRepository
      .createQueryBuilder('notify')
      .leftJoinAndSelect('notify.user', 'user')
      .where('notify.createdAt < :createdAt', {
        createdAt: targetNotification.createdAt,
      })
      .andWhere('user.id = :id', { id: user.id })
      .orderBy('notify.createdAt', 'DESC')
      .take(1)
      .getOne();
    console.log(newNotification);
    return newNotification;
  }

  async getById(notificationId?: string) {
    if (notificationId ?? false) {
      return await this.notificationRepository.findOne({
        where: { id: notificationId },
      });
    }
  }

  async countTopUnreadNotification(userId: string, notificationId?: string) {
    // console.log(notificationId);
    if (notificationId !== 'null') {
      console.log('notifiationId is not null', notificationId);
      const notification = await this.getById(notificationId);
      if (!notification) {
        throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
      }
      const query = await this.notificationRepository
        .createQueryBuilder('notification')
        .leftJoinAndSelect('notification.user', 'user')
        .where('notification.createdAt < :createdAt', {
          createdAt: notification.createdAt,
        })
        .andWhere('user.id = :userId', { userId: userId })
        .andWhere('notification.markAsRead = :markAsRead', {
          markAsRead: false,
        })
        .execute();
      console.log(query);
      return query;
    } else {
      const notification = await this.getNotificationOfUser(userId, 0, 11);
      return notification.length;
    }
  }

  async getNotificationOfUser(id: string, page: number, limit: number) {
    const notification = await this.notificationRepository.find({
      where: { user: { id: id } },
      relations: ['relatedUser'],
      order: { createdAt: 'DESC' },
      skip: page * limit,
      take: limit,
    });
    return notification;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Order from './order.entity';
import { Repository } from 'typeorm';
import { CreateNotificationParams } from 'src/utils/types';
import { UsersService } from 'src/users/users.service';
import User from 'src/users/user.entity';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UsersService,
  ) { }


  async createOrders(orderData: any) {

    const order = this.orderRepository.create({
      package: orderData.package, price: orderData.price, user: instanceToPlain(orderData.user)
    });
    return await this.orderRepository.save(order);

  }


  async findOrder(id: string) {
    console.log(id)
    const order = await this.orderRepository.findOne({
      where: { id: id },
      relations: [
        'user', 'user.profile'
      ],
    });
    // console.log(user);
    if (order) {
      return order;
    }

    throw new HttpException(
      'order with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }


  async findOrders() {
    try {

      const orders = await this.orderRepository.find({
        relations: ['user', 'user.profile', 'user.family', 'user.education', 'user.preferance', 'user.photos'],
      });
      return orders;

    } catch (error) {
      throw new HttpException('Failed to fetch orders', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async editMessage(params: any) {
    const order = await this.orderRepository.findOne({
      where: {
        id: params.orderId,
      },

    });
    if (!order) {
      throw new HttpException('Cannot edit Order', HttpStatus.BAD_REQUEST);
    }
    order.paymentStatus = params.paymentStatus
    return this.orderRepository.save(order);
  }


  async updatePayment(orderId,paymentStatus) {
    const order = await this.orderRepository.findOne({
      where: {
        id:orderId,
      },

    });
    if (!order) {
      throw new HttpException('Cannot edit Order', HttpStatus.BAD_REQUEST);
    }
    
    console.log(order)
    order.paymentStatus = paymentStatus
    console.log(order);
    return this.orderRepository.save(order);
  }
}



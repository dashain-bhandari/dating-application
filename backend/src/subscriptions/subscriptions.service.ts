import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import Subscription from './subscriptions.entity';
import User from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectRepository(Subscription)
        private readonly subscriptionRepository: Repository<Subscription>,
        private userService: UsersService
    ) { }

    async createSubscription(userId: string, duration: number): Promise<Subscription> {
        console.log(userId)
        let user = await this.userService.getById(userId);

        const subs = await this.subscriptionRepository.findOne({
            where: { user: { id: user.id } },
        });
        //update if exists
        if (subs) {
            subs.duration = duration;
            //subs.startDate = subs.expiryDate
            subs.startDate = new Date();
            subs.reminderSent = false
            subs.user = user;
            return this.subscriptionRepository.save(subs);
        }
        else {
            let sub = new Subscription();
            sub.duration = duration;
            sub.startDate = new Date();
            sub.user = user;
            return this.subscriptionRepository.save(sub);
        }

    }

    async findExpiringSubscriptions(): Promise<Subscription[]> {
        const now = new Date();
       // const oneDayLater = new Date(now.getTime() + 35 * 24 * 60 * 60 * 1000);
       const oneDayLater = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
        return this.subscriptionRepository.find({
            where: {
                expiryDate: Between(now, oneDayLater),
                //reminderSent: false,
            },
            relations: ["user"]
        });
    }

    async findExpiredSubscriptions(): Promise<Subscription[]> {
        const now = new Date();
        const oneDayBefore = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        return this.subscriptionRepository.find({
            where: {
                // expiryDate: Between(oneDayBefore, now),
                expiryDate: oneDayBefore,
                status: "active"
            },
            relations: ["user"]
        });
    }
    async updateSubscriptions(subscriptionId:string): Promise<void> {
        await this.subscriptionRepository.update(subscriptionId, { status: "expired" });
    }

    async getSubscription(userId: string) {
        const subs = await this.subscriptionRepository.findOne({
            where: { user: { id: userId } },
            relations: ["user"]
        });

        // if (!subs) {
        //     throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
        // }
        return subs;
    }


    async findAllSubscriptions() {
        const subs = await this.subscriptionRepository.find({

            relations: ["user"]
        });

        // if (!subs) {
        //     throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
        // }
        return subs;
    }



    async markReminderSent(subscriptionId: string): Promise<void> {
        await this.subscriptionRepository.update(subscriptionId, { reminderSent: true });
    }
}

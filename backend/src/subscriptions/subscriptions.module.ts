import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Subscription from './subscriptions.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { SubscriptionService } from './subscriptions.service';
import { SubscriptionController } from './subscriptions.controller';
import { ReminderService } from './reminder.service';
import { EmailService } from 'src/email/email.service';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription]), UsersModule,EmailModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService,ReminderService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
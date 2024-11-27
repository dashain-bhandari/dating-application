import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import User from 'src/users/user.entity';
import Post from 'src/posts/posts.entity';
import Admin from 'src/admin/admin.entity';
import Photos from 'src/photos/photos.entity';
import Preferance from 'src/preferance/preferance.entity';
import Profile from 'src/profile/profile.entity';
import UserAvatar from 'src/user-avatar/user-avatar.entity';
import { ForgetPassword } from 'src/forget-password/forget-password.entity';
import Family from 'src/family/family.entity';
import EducationEntity from 'src/education/education.entity';
import { Connection } from 'src/connection/connection.entity';
import { ConnectionRequest } from 'src/connection-requests/connection-request.entity';
import { Message } from 'src/message/message.entity';
import { MessageAttachment } from 'src/message-attachments/message-attachments.entity';
import { Conversation } from 'src/conversations/conversation.entity';
import { Peer } from 'src/peer/peer.entity';
import Notification from 'src/notification/notification.entity';
import { Call } from 'src/call/call.entity';
import Banner from 'src/banner/banner.entity';
import { EmailVerification } from 'src/email-verification/email-verification.entity';
import Order from 'src/order/order.entity';
import Payment from 'src/payment/payment.entity';
import Subscription from 'src/subscriptions/subscriptions.entity';
import { Email } from 'src/email/emai.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // url: configService.get('POSTGRES_URL'),
        // url: 'postgres://qydpwtbb:1VP0U9h1VyXsT0eEKr2cQXtGWlwPlPNj@fanny.db.elephantsql.com/qydpwtbb',
        // url: "postgres://postgres.mfcwlhwiprohtouogpor:ourlifepartner7@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres",
        //  url:"postgres://postgres:postgres@localhost/postgres",
        url: "postgresql://ourlifepartner_owner:qNhxw6DRGcH0@ep-solitary-shape-a13j5jsq.ap-southeast-1.aws.neon.tech/ourlifepartner?sslmode=require",
        entities: [
          User,
          Post,
          Admin,
          Photos,
          Order,
          Payment,
          Preferance,
          Profile,
          UserAvatar,
          ForgetPassword,
          Family,
          EducationEntity,
          Connection,
          ConnectionRequest,
          Message,
          MessageAttachment,
          Conversation,
          Peer,
          Notification,
          Call,
          Banner,
          EmailVerification,
          Subscription,
          Email
          // __dirname + '/../**/*.entity.ts'
        ],
        timezone: 'UTC',
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule { }

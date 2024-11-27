import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { AdminModule } from './admin/admin.module';
import { ProfileModule } from './profile/profile.module';
import { PreferanceModule } from './preferance/preferance.module';
import { PhotosModule } from './photos/photos.module';
import { GoogleAuthenticationModule } from './google-authentication/google-authentication.module';
import { EmailModule } from './email/email.module';
import * as Joi from 'joi';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailScheduleModule } from './email-schedule/email-schedule.module';
import { UserAvatarModule } from './user-avatar/user-avatar.module';
import { ForgetPasswordModule } from './forget-password/forget-password.module';
import { FamilyModule } from './family/family.module';
import { EducationModule } from './education/education.module';
import { ConnectionModule } from './connection/connection.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConnectionRequestsModule } from './connection-requests/connection-requests.module';
import { MessageModule } from './message/message.module';
import { MessageAttachmentsModule } from './message-attachments/message-attachments.module';
import { ConversationsModule } from './conversations/conversations.module';
import { EventsModule } from './events/events.module';
//import { SocketwayModule } from './socketway/socketway.module';
import { SessionManagerModule } from './session-manager/session-manager.module';
import { WsAuthGuard } from './authentication/ws-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PeerModule } from './peer/peer.module';
import { CallModule } from './call/call.module';
import { NotificationModule } from './notification/notification.module';
import { BannerModule } from './banner/banner.module';
import { EmailVerificationModule } from './email-verification/email-verification.module';
import { RecommendationModule } from './recommendation/recommendation.module';
import { SocketGateway } from './dash-socket/socket.gateway';
import { PaymentModule } from './payment/payment.module';
import { OrderModule } from './order/order.module';
import { SubscriptionModule } from './subscriptions/subscriptions.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AnalyticsModule } from './googleAnalytics/analytics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './users/user.entity';
import { Connection } from './connection/connection.entity';
import { Email } from './email/emai.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Connection]),
    TypeOrmModule.forFeature([Email]),
    ScheduleModule.forRoot(),
    UsersModule,
    PostsModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().optional(),
        POSTGRES_PORT: Joi.number().optional(),
        POSTGRES_USER: Joi.string().optional(),
        POSTGRES_PASSWORD: Joi.string().optional(),
        POSTGRES_HOST: Joi.string().optional(),
        POSTGRES_DB: Joi.string().optional(),
        POSTGRES_URL: Joi.string().optional(),
        ACCESS_TOKEN_SECRET: Joi.string().default('iuhsdjbfe3rr'),
        ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().default('30d'),
        REFRESH_TOKEN_SECRET: Joi.string().default('iuhsdjbfe3rrdsd'),
        REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().default('30d'),
        GOOGLE_AUTH_CLIENT_ID: Joi.string().optional(),
        GOOGLE_AUTH_CLIENT_SECRET: Joi.string().optional(),
        EMAIL_SERVICE: Joi.string().optional(),
        EMAIL_HOST: Joi.string().optional(),
        EMAIL_PORT: Joi.number().optional(),
        EMAIL_USER: Joi.string().optional(),
        EMAIL_PASSWORD: Joi.string().optional(),
        CLIENT_URL: Joi.string().optional(),
      }).optional(), // making the entire schema optional
    }),
    DatabaseModule,
    AuthenticationModule,
    AdminModule,
    ProfileModule,
    PreferanceModule,
    PhotosModule,
    GoogleAuthenticationModule,
    EmailModule,
    EmailScheduleModule,
    UserAvatarModule,
    ForgetPasswordModule,
    FamilyModule,
    EducationModule,
    ConnectionModule,
    EventEmitterModule.forRoot(),
    ConnectionRequestsModule,
    MessageModule,
    MessageAttachmentsModule,
    ConversationsModule,
    EventsModule,
   //SocketwayModule,
    SessionManagerModule,
    PeerModule,
    CallModule,
    NotificationModule,
    BannerModule,
    EmailVerificationModule,
    RecommendationModule,
    PaymentModule,
    OrderModule,
    SubscriptionModule,
    CloudinaryModule,
     AnalyticsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthenticationService,
    {
      provide: APP_GUARD,
      useClass: WsAuthGuard,
    },
    SocketGateway
  ],
})
export class AppModule {}

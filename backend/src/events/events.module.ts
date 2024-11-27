import { Module } from '@nestjs/common';
import { ConnectionRequestEvent } from './connection-requests.events';
import { ConnectionEvents } from './connection.events';
// import { SocketwayModule } from 'src/socketway/socketway.module';
import { NotificationModule } from 'src/notification/notification.module';
import { UsersModule } from 'src/users/users.module';
import { ConnectionModule } from 'src/connection/connection.module';

@Module({
  imports: [

     NotificationModule, UsersModule, ConnectionModule],
  providers: [ConnectionRequestEvent, ConnectionEvents],
})
export class EventsModule {}

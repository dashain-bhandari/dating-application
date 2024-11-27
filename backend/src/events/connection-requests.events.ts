import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ConnectionRequest } from 'src/connection-requests/connection-request.entity';
import { ConnectionService } from 'src/connection/connection.service';
import { NotificationService } from 'src/notification/notification.service';
// import { SocketwayService } from 'src/socketway/socketway.service';
import { UsersService } from 'src/users/users.service';
import {
  AcceptConnectionRequestResponse,
  ConnectionRequestEventPayload,
} from 'src/utils/types';

@Injectable()
export class ConnectionRequestEvent {
  constructor(
    // private readonly gateway: SocketwayService,
    private readonly userService: UsersService,
    private readonly connectionService: ConnectionService,
    private readonly notificationService: NotificationService,
  ) {}

  @OnEvent('connection-request.create')
  async connectionRequestCreate(payload: ConnectionRequest) {
    // const receiverSocket = this.gateway.sessionManager.getUserSocket(
    //   payload.receiver.id,
    // );
    // if (!receiverSocket) {
    const senderUser = await this.userService.getById(payload.sender.id);
    const notification = await this.notificationService.create({
      heading: `${senderUser.profile.fullname} sent you a connection request`,
      content: 'none',
      type: 'createConnectionRequest',
      user: payload.receiver,
      relatedUser: senderUser,
    });
    // }
    console.log('onConnectionRequestReceived to be hit');
    // receiverSocket &&
    //   receiverSocket.emit('onNotificationReceived', notification);
    // receiverSocket &&
    //   receiverSocket.emit('onConnectionRequestReceived', payload);
  }

  @OnEvent('connection-request.cancel')
  async handleConnectionRequestCancel(payload: ConnectionRequest) {
    // const receiverSocket = this.gateway.sessionManager.getUserSocket(
    //   payload.receiver.id,
    // );
    // const connection = await this.connectionService.isConnection(
    //   payload.sender.id,
    //   payload.receiver.id,
    // );
    console.log('onConnectionRequestCancelled to be hit');
    // receiverSocket &&
    //   receiverSocket.emit('onConnectionRequestCancelled', payload);
  }

  @OnEvent('connection-request.accepted')
  async handleConnectionRequestAccepted(
    payload: AcceptConnectionRequestResponse,
  ) {
    // const senderSocket = await this.gateway.sessionManager.getUserSocket(
    //   payload.connectionRequest.sender.id,
    // );
    // const receiverSocket = this.gateway.sessionManager.getUserSocket(
    //   payload.connectionRequest.receiver.id,
    // );

    const recepient = await this.userService.getById(
      payload.connectionRequest.receiver.id,
    );
    console.log(payload.connectionRequest.receiver);
    const notification = await this.notificationService.create({
      heading: `${recepient.profile.fullname} accepted your connection request.`,
      content: 'none',
      type: 'connectionRequestAccepted',
      user: payload.connectionRequest.sender,
      relatedUser: recepient,
    });

    // senderSocket && senderSocket.emit('onNotificationReceived', notification);
    // console.log('onConnectionRequestAccepted to be hit');
    // receiverSocket &&
    //   receiverSocket.emit('onConnectionRequestAccepted', payload);
    // senderSocket && senderSocket.emit('onConnectionRequestAccepted', payload);
  }

  @OnEvent('connection-request.reject')
  handleConnectionRequestRejected(payload: ConnectionRequest) {
    // const senderSocket = this.gateway.sessionManager.getUserSocket(
    //   payload.sender.id,
    // );
    console.log('onConnecitonRequest to be hit');
    // senderSocket.emit('onConnectionRequestR', {});
    // console.log(senderSocket && senderSocket.id);
    // senderSocket && senderSocket.emit('onConnectionRequestRejected', payload);
  }
}


import { Socket, Namespace } from "socket.io";

import { AuthSocket, WSAuthMiddleware } from "./socket.middleware";
import { Server } from "socket.io";
import { HttpException, Inject, Injectable, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { WsAuthGuard } from 'src/authentication/ws-auth.guard';
import { AuthenticatedSocket } from 'src/utils/interfaces';
import { SessionManagerService } from 'src/session-manager/session-manager.service';
import { SocketIOMiddleware } from 'src/authentication/ws-mw';
import { UsersService } from 'src/users/users.service';
import { ConnectionService } from 'src/connection/connection.service';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateMessageResponse } from 'src/utils/types';
import { Conversation } from 'src/conversations/conversation.entity';
import { ConversationsService } from 'src/conversations/conversations.service';
import { NotificationService } from 'src/notification/notification.service';
import { MessageService } from 'src/message/message.service';
import { CallService } from 'src/call/call.service';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from "express";

@WebSocketGateway({
  cors: {
    origin: ['https://olp.logindesigns.com', 'http://localhost:5173', 'http://ourlifepartner.com', "https://ourlifepartner.com"],
    credentials: true,
  },
})
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly notificationService: NotificationService,
    readonly sessionManager: SessionManagerService,
    private readonly connectionService: ConnectionService,
    private readonly conversationService: ConversationsService,
    private readonly callService: CallService,
    private readonly messageService: MessageService,
  ) { }
  @WebSocketServer() server:
    Server;
  afterInit(server:Server) {
    const middle = WSAuthMiddleware(this.jwtService, this.userService)
     server.use((socket:AuthenticatedSocket,next:any)=>middle(socket,next));
   // server.use((socket, next) => middle(socket, next));
    console.log("socket initialized");
  }

  // private activeUsers: any = [];
  private activeUsers = new Map();

  async handleConnection(client: AuthSocket, ...args: any[]) {

    //console.log(`client connected: ${client.userId}`);
    const user = await this.userService.getById(client.userId);
    // if (!user) throw new Error('User is not registered');
    if (!user) return null;

    this.activeUsers.set(client.userId, client.userId);
    console.log(this.activeUsers);
    console.log(`${user.username} connected`);
    console.log('active users: ', [...this.activeUsers.values()]);
    this.server.emit('activeUsers', [...this.activeUsers.values()]); // Emit active users list to all clients
    console.log(this.activeUsers);
    this.sessionManager.setUserSocket(client.userId, client);
    
    // console.log("session",this.sessionManager.getUserSocket(client.id))
    // console.log(`client connected:${client.id}`)
  }
  async handleDisconnect(client: AuthSocket) {

    console.log("client disconnected", client.userId);
    this.activeUsers.delete(client.userId);
    console.log(this.activeUsers);
    console.log([...this.activeUsers.values()])

    this.server.emit('activeUsers', [...this.activeUsers]);
    this.sessionManager.removeUserSocket(client.userId);

  }


  @SubscribeMessage('onConversationJoin')
  onConversationJoin(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    client.join(`conversation-${data?.conversationId}`);
    client.to(`conversation-${data?.conversationId}`).emit('userJoin');
  }

  @SubscribeMessage('onConversationLeave')
  onConversationLeave(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    client.leave(`conversation-${data?.conversationId}`);
    client.to(`conversation-${data?.conversationId}`).emit('userLeave');
  }

  @SubscribeMessage('onTypingStart')
  onTypingStart(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    console.log('onTypingStart');
    const receiverSocket = this.sessionManager.getUserSocket(data.recepientId);
    // const receiver = data.conversation && data.conversation.creator.id == client.user.id ? data.conversation.receiver.id
    // console.log(client.rooms);
    // client.to(`conversation=${data.roomId}`).emit('onTypingStart');
    if (!receiverSocket) return;
    receiverSocket.emit('onTypingStart');
  }


  @SubscribeMessage('onTypingStop')
  onTypingStop(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    console.log('onTypingStop');
    const receiverSocket = this.sessionManager.getUserSocket(data.recepientId);
    if (!receiverSocket) return;
    receiverSocket.emit('onTypingStop');
    // client.to(`conversation-${data.roomId}`).emit('onTypingStop');
  }

  @SubscribeMessage('getConnectionOnline')
  async handleConnectionListRetrieve(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    const { userId } = client;
    console.log(client)
    if (userId) {
      console.log('user is authenticated');
      console.log(`fetching ${userId}'s friends`);
      const connections = await this.connectionService.getConnections(
        userId,
      );
      console.log(connections);
      console.log(userId);
      //if both active then set this logic handled here.
      const onlineConnections = connections.filter((connection) =>
        this.sessionManager.getUserSocket(
          userId === connection.sender.id
            ? connection.receiver.id
            : connection.sender.id,
        ),
      );
      console.log(onlineConnections);
      client.emit('getConnectionOnline', onlineConnections);
    }
  }

  @OnEvent('message.create')
  handleMessageCreateEvent(payload: CreateMessageResponse) {
    const {
      author,
      conversation,
    } = payload.message;
    console.log(author.id)
    const authorSocket = this.sessionManager.getUserSocket(author.id);
    const receiver = author.id == conversation?.creator?.id ? conversation?.recepient : conversation?.creator;
    console.log(receiver);
    console.log(this.activeUsers)
    console.log(conversation)
    console.log(conversation?.recepient)
    const recepientSocket =
      author.id == conversation?.creator?.id
        ? this.sessionManager.getUserSocket(conversation?.recepient?.id)
        : this.sessionManager.getUserSocket(conversation?.creator?.id);

    console.log("author", authorSocket?.id);
    console.log("reciever", recepientSocket?.id)
    if (authorSocket) authorSocket.emit('onMessage', payload);
    if (recepientSocket) recepientSocket.emit('onMessage', payload);
    if (!recepientSocket)
      this.notificationService.create({
        heading: `You received a message from ${author.profile.fullname}`,
        content: 'none',
        type: 'messageReceived',
        relatedUser: author,
        user: receiver,
      });
  }


  @OnEvent('conversation.create')
  handleConversationCreate(payload: Conversation) {
    const recepientSocket = this.sessionManager.getUserSocket(
      payload.recepient.id,
    );
    // const creatorSocket = this.sessionManager.getUserSocket(payload.creator.id);

    // if (creatorSocket) creatorSocket.emit('onConversation', payload);
    if (recepientSocket) recepientSocket.emit('onConversation', payload);
    if (!recepientSocket) {
      this.notificationService.create({
        heading: `You have new conversation with ${payload.creator.profile.fullname}`,
        content: 'none',
        type: 'conversationReceived',
        relatedUser: payload.creator,
        user: payload.recepient,
      });
    }
  }

  @OnEvent('message.delete')
  async handleMessageDelete(payload) {
    const conversation = await this.conversationService.findById(
      payload.conversationId,
    );
    if (!conversation) return;
    const { creator, recepient } = conversation;
    const recepientSocket =
      creator.id === payload.userId
        ? this.sessionManager.getUserSocket(recepient.id)
        : this.sessionManager.getUserSocket(creator.id);
    if (recepientSocket) recepientSocket.emit('onMessageDelete', payload);
  }

  @SubscribeMessage('onVideoCallInitiate')
  async handleVideoCall(
    @MessageBody() data: any,
    @ConnectedSocket() socket: AuthenticatedSocket,
  ) {
    console.log('onVideoCallInitiate');
    const user = await this.userService.getById(socket.userId);

    const caller = user;
    console.log(caller);
    const receiverSocket = this.sessionManager.getUserSocket(data.recepientId);
    const isConnected = await this.connectionService.isConnection(
      caller.id,
      data.recepientId,
    );
    if (!isConnected) return;
    const receiver = await this.userService.getById(data.recepientId);

    const callDetails = await this.messageService.createCall({
      user: user,
      type: 'video',
      status: 'initiate',
      id: data.conversationId,
    });

    receiverSocket &&
      receiverSocket.emit('onVideoCall', {
        ...data,
        caller,
        callDetails,
      });
    // socket &&
    //   socket.emit('onVoiceCall', {
    //     ...data,
    //     caller,
    //     callDetails,
    //   });
    if (!receiverSocket) {
      setTimeout(async () => {
        const updateCall = await this.callService.update({
          status: 'missed',
          id: callDetails.call.id,
        });
        socket.emit('onUserUnavailable', { ...callDetails, call: updateCall });
        await this.notificationService.create({
          heading: `You missed a call from ${caller.profile.fullname}`,
          content: 'none',
          type: 'missedCall',
          user: receiver,
          relatedUser: caller,
        });
      }, 20000);
    }
  }

  @SubscribeMessage('onVideoCallAccept')
  async handleVideoCallAccepted(
    @MessageBody() data: any,
    @ConnectedSocket() socket: AuthenticatedSocket,
  ) {
    console.log('onVideoCallAccept');
    console.log(data);
    const callerSocket = this.sessionManager.getUserSocket(data.caller.id);
    const conversation = await this.conversationService.isCreated(
      data.caller.id,
      socket.userId,
    );

    if (!conversation) return console.log('No conversation found');
    const user = await this.userService.getById(socket.userId);
    if (callerSocket) {
      const updateCall = await this.callService.update({
        status: 'accepted',
        id: data.callDetail.call.id,
      });
      const payload = {
        ...data,
        conversation,
        acceptor: user,
        callDetail: { ...data.callDetail, call: updateCall },
      };
      callerSocket.emit('onVideoCallAccept', payload);
      socket.emit('onVideoCallAccept', payload);
    }
  }

  @SubscribeMessage('onVideoCallRejected')
  async handleVideoCallRejected(
    @MessageBody() data: any,
    @ConnectedSocket() socket: AuthenticatedSocket,
  ) {
    console.log('onVideoCall Reject');
    const receiverId = socket.userId;
    const callerSocket = this.sessionManager.getUserSocket(data.caller.id);
    console.log(data.callDetail);
    const updateCall = await this.callService.update({
      status: 'rejected',
      id: data.callDetail.call.id,
    });
    callerSocket &&
      callerSocket.emit('onVideoCallRejected', {
        caller: data.caller,
        callDetail: {
          ...data.callDetail,
          call: updateCall,
        },
      });
    socket.emit('onVideoCallRejected', {
      caller: data.caller,
      callDetail: {
        ...data.callDetail,
        call: updateCall,
      },
    });
  }

  @SubscribeMessage('onVideoCallHangUp')
  async handleVideoCallHangUp(
    @MessageBody() data: any,
    @ConnectedSocket() socket: AuthenticatedSocket,
  ) {
    let updateCall;
    if (data.callDetail) {
      updateCall = await this.callService.update({
        status: 'completed',
        id: data.callDetail.call.id,
      });
    }
    if (socket.userId === data.caller.id) {
      const receiverSocket = this.sessionManager.getUserSocket(
        data.receiver.id,
      );

      socket.emit(
        'onVideoCallHangUp',
        data.callDetail && {
          ...data.callDetail,
          call: updateCall,
        },
      );
      return (
        receiverSocket &&
        receiverSocket.emit(
          'onVideoCallHangUp',
          data.callDetail && {
            ...data.callDetail,
            call: updateCall,
          },
        )
      );
    }

    socket.emit(
      'onVideoCallHangUp',
      data.callDetail && {
        ...data.callDetail,
        call: updateCall,
      },
    );
    const callerSocket = this.sessionManager.getUserSocket(data.caller.id);
    callerSocket &&
      callerSocket.emit(
        'onVideoCallHangUp',
        data.callDetail && {
          ...data.callDetail,
          call: updateCall,
        },
      );
  }

  @SubscribeMessage('onVoiceCallInitiate')
  async handleVoiceCallInitiate(
    @MessageBody() data: any,
    @ConnectedSocket() socket: AuthenticatedSocket,
  ) {
    const user = await this.userService.getById(socket.userId);
    console.log(user)
    const caller = user;

    const receiver = await this.userService.getById(data.recepientId);
    const isConnected = this.connectionService.isConnection(
      caller.id,
      data.recepientId,
    );
    if (!isConnected) return;
    const receiverSocket = this.sessionManager.getUserSocket(data.recepientId);
    console.log(receiverSocket)
    const callDetails = await this.messageService.createCall({
      user: user,
      type: 'voice',
      status: 'initiate',
      id: data.conversationId,
    });

    receiverSocket &&
      receiverSocket.emit('onVoiceCall', {
        ...data,
        caller,
        callDetails,
      });
    // socket &&
    //   socket.emit('onVoiceCall', {
    //     ...data,
    //     caller,
    //     callDetails,
    //   });
    console.log('emitting voice call');
    if (!receiverSocket) {
      setTimeout(async () => {
        const updateCall = await this.callService.update({
          status: 'missed',
          id: callDetails.call.id,
        });
        console.log('uaer not  available');
        socket.emit('onUserUnavailable', { ...callDetails, call: updateCall });

        await this.notificationService.create({
          heading: `You missed a call from ${caller.profile.fullname}`,
          content: 'none',
          type: 'missedCall',
          user: receiver,
          relatedUser: caller,
        });
      }, 20000);
    }
  }

  @SubscribeMessage('onVoiceCallAccept')
  async handleVoiceCallAccepted(
    @MessageBody() data: any,
    @ConnectedSocket() socket: AuthenticatedSocket,
  ) {
    console.log('onVoiceCallAccept');
    const callerSocket = this.sessionManager.getUserSocket(data.caller.id);
    const conversation = await this.conversationService.isCreated(
      data.caller.id,
      socket.userId,
    );

    if (!conversation) return console.log('No conversation found');
    const user = await this.userService.getById(socket.userId);
    if (callerSocket) {
      const updateCall = await this.callService.update({
        status: 'accepted',
        id: data.callDetail.call.id,
      });
      const payload = {
        ...data,
        conversation,
        acceptor: user,
        callDetail: { ...data.callDetail, call: updateCall },
      };
      callerSocket.emit('onVoiceCallAccept', payload);
      socket.emit('onVoiceCallAccept', payload);
    }
  }

  @SubscribeMessage('onVoiceCallRejected')
  async handleVoiceCallRejected(
    @MessageBody() data: any,
    @ConnectedSocket() socket: AuthenticatedSocket,
  ) {
    const receiverId = socket.userId;
    const callerSocket = this.sessionManager.getUserSocket(data.caller.id);
    const updateCall = await this.callService.update({
      status: 'rejected',
      id: data.callDetail.call.id,
    });
    callerSocket &&
      callerSocket.emit('onVoiceCallRejected', {
        caller: data.caller,
        callDetail: {
          ...data.callDetail,
          call: updateCall,
        },
      });
    socket.emit('onVoiceCallRejected', {
      caller: data.caller,
      callDetail: {
        ...data.callDetail,
        call: updateCall,
      },
    });
  }

  @SubscribeMessage('onVoiceCallHangUp')
  async handleVoiceCallHangUp(
    @MessageBody() data: any,
    @ConnectedSocket() socket: AuthenticatedSocket,
  ) {
    let updateCall;
    if (data.callDetail) {
      updateCall = await this.callService.update({
        status: 'completed',
        id: data.callDetail.call.id,
      });
    }
    if (socket.userId === data.caller.id) {
      const receiverSocket = this.sessionManager.getUserSocket(
        data.receiver.id,
      );
      socket.emit(
        'onVoiceCallHangUp',
        data.callDetail && {
          ...data.callDetail,
          call: updateCall,
        },
      );
      return (
        receiverSocket &&
        receiverSocket.emit(
          'onVoiceCallHangUp',
          data.callDetail && {
            ...data.callDetail,
            call: updateCall,
          },
        )
      );
    }

    socket.emit(
      'onVoiceCallHangUp',
      data.callDetail && {
        ...data.callDetail,
        call: updateCall,
      },
    );
    const callerSocket = this.sessionManager.getUserSocket(data.caller.id);
    callerSocket &&
      callerSocket.emit(
        'onVoiceCallHangUp',
        data.callDetail && {
          ...data.callDetail,
          call: updateCall,
        },
      );
  }
}

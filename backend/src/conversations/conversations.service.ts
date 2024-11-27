import { Injectable } from '@nestjs/common';
import User from 'src/users/user.entity';
import { CreateConversationDto } from './dto/createConversation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from './conversation.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import {
  AccessParams,
  CreateConversationParams,
  GetConversationMessagesParams,
  UpdateConversationParams,
} from 'src/utils/types';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { CreateconversationException } from './exceptions/CreateConversation.exception';
import { ConnectionService } from 'src/connection/connection.service';
import { ConnectionNotFoundException } from 'src/connection/exception/connectionNotFound.exception';
import { ConversationExistsException } from './exceptions/ConversationExists.exception';
import { Message } from 'src/message/message.entity';
import { ConversationNotFoundException } from './exceptions/ConversationNotFound.exception';
import { string } from 'joi';


@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly userService: UsersService,
    private readonly connectionService: ConnectionService,

  ) { }

  async getConversations(id: string) {
    return this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.lastMessageSent', 'lastMessageSent')
      .leftJoinAndSelect('lastMessageSent.author', 'author')
      .leftJoinAndSelect('lastMessageSent.call', 'call')
      .leftJoinAndSelect('conversation.creator', 'creator')
      .leftJoinAndSelect('creator.profile', 'creatorProfile')
      .leftJoinAndSelect('conversation.recepient', 'recepient')
      .leftJoinAndSelect('recepient.profile', 'recepientProfile')
      .leftJoinAndSelect('recepient.subscription', 'recepientSubscription')
      .leftJoinAndSelect('creator.subscription', 'creatorSubscription')
      .where('creator.id = :id', { id })
      .orWhere('recepient.id = :id', { id })
      .orderBy('conversation.lastMessageSentAt', 'DESC')
      .getMany();
  }

  async findById(id: string) {
    return this.conversationRepository.findOne({
      where: { id },
      relations: [
        'creator',
        'recepient',
        'creator.profile',
        'recepient.profile',
        'lastMessageSent',
        'recepient.subscription',
        'creator.subscription',
      ],
    });
  }

  async isCreated(userId: string, recepientId: string) {
    return this.conversationRepository.findOne({
      where: [
        {
          creator: { id: userId },
          recepient: { id: recepientId },
        },
        {
          creator: { id: recepientId },
          recepient: { id: userId },
        },
      ],
    });
  }

  async createConversation(creator: User, params: CreateConversationParams) {
    const { userId, message } = params;
    const recepient = await this.userService.getById(userId);
    if (!recepient) throw new UserNotFoundException();
    if (creator.id === recepient.id) {
      throw new CreateconversationException(
        'Cannot create conversation with youself',
      );
    }

    // const isConnected = await this.connectionService.isConnection(
    //   creator.id,
    //   userId,
    // );
    // if (!isConnected) throw new ConnectionNotFoundException();
    const exists = await this.isCreated(creator.id, recepient.id);
    if (exists) throw new ConversationExistsException();
    const newConversation = this.conversationRepository.create({
      creator,
      recepient,
    });
    const conversation = await this.conversationRepository.save(
      newConversation,
    );
    // const newMessage = this.messageRepository.create({
    //   content: message,
    //   conversation,
    //   author: creator,
    // });
    // await this.messageRepository.save(newMessage);
    // // const conversationToUpdate = await this.findById(newConversation.id);
    // conversation.lastMessageSent = newMessage;
    // const updated = await this.conversationRepository.save(conversation);
    return conversation;
  }

  async hasAccess({ id, userId }: AccessParams) {
    const conversation = await this.findById(id);
    if (!conversation) throw new ConversationNotFoundException();
    return (
      conversation.creator.id === userId || conversation.recepient.id === userId
    );
  }

  async save(conversation: Conversation) {
    return this.conversationRepository.save(conversation);
  }

  getMessage({ id, limit }: GetConversationMessagesParams) {
    return this.conversationRepository
      .createQueryBuilder('conversation')
      .where('id = :id', { id })
      .leftJoinAndSelect('conversation.lastMessageSent', 'lastMessageSent')
      .leftJoinAndSelect('conversation.messages', 'message')
      .where('conversation.id = :id', { id })
      .orderBy('message.createdAt', 'DESC')
      .limit(limit)
      .getOne();
  }

  update({ id, lastMessageSent }: UpdateConversationParams) {
    return this.conversationRepository.update(id, { lastMessageSent });
  }


  // updateStatus(id:string) {
  //   return this.conversationRepository.update(id, { read:true });
  // }

  async deleteConversations(id: string, userId: string) {

    try {
      const conversation = await this.conversationRepository.findOne({
        where: { id: id }, relations: [
          'creator',
          'recepient',
          'creator.profile',
          'recepient.profile',
          'lastMessageSent',
        ]
      });

      if (!conversation) {
        throw new Error('Conversation not found');
      }
      console.log(conversation)

      const messages = await this.messageRepository.find({
        where: {
          conversation: { id: id },
        },
        relations: [
          'conversation',
          'conversation.creator',
          'conversation.recepient',
          'author',
          'author.profile',
        ],
      });

      for (let message of messages) {
        if (!message.deletedBy?.includes(userId)) {
          if (message.deletedBy) message.deletedBy = [...message.deletedBy, userId];
          else {
            message.deletedBy = [userId]
          }
        }
        await this.messageRepository.save(message);
      }


      if (conversation?.recepient?.id == userId) {

        return this.conversationRepository.update(id, { deletedByRecepient: true });
      }

      if (conversation?.creator?.id == userId) {
        return this.conversationRepository.update(id, { deletedByCreator: true });
      }


    }

    catch (error) {
      console.log(error.message)
      throw new Error(error.message);
    }
  }

  async updateReadStatus(id: string, userId: string) {

    try {
      const conversation = await this.conversationRepository.findOne({
        where: { id: id }, relations: [
          'creator',
          'recepient',
          'creator.profile',
          'recepient.profile',
          'lastMessageSent',
        ],
      });
      console.log(conversation);

      if (!conversation) {
        throw new Error('Conversation not found');
      }

      if (conversation?.recepient?.id == userId) {
        return this.conversationRepository.update(id, { readByRecepient: true });
      }

      if (conversation?.creator?.id == userId) {
        return this.conversationRepository.update(id, { readByCreator: true });
      }
    }

    catch (error) {
      throw new Error(error.message);
    }
  }


  async updateLastMessage(id: string, userId: string) {

    try {
      const conversation = await this.conversationRepository.findOne({
        where: { id: id }, relations: [
          'creator',
          'recepient',
          'creator.profile',
          'recepient.profile',
          'lastMessageSent',
        ],
      });
      console.log(conversation);

      if (!conversation) {
        throw new Error('Conversation not found');
      }

      if (conversation.lastMessageSent) {
        conversation.lastMessageSent.read = true;
        return await this.conversationRepository.save(conversation)
      }

    }

    catch (error) {
      throw new Error(error.message);
    }
  }


  async updateDel(id: string, data: any) {

    try {
      const conversation = await this.conversationRepository.findOne({
        where: { id: id }, relations: ['creator',
          'recepient',
          'creator.profile',
          'recepient.profile',
          'lastMessageSent',]
      });

      if (!conversation) {
        throw new Error('Conversation not found');
      }

      console.log("updates")
      conversation[data] = false;
      console.log(conversation)
      return await this.conversationRepository.save(conversation)

    }

    catch (error) {
      throw new Error(error.message);
    }
  }
}

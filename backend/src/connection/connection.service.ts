import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from './connection.entity';
import { Repository } from 'typeorm';
import { DeleteConnectionRequestParams } from 'src/utils/types';
import { ConnectionNotFoundException } from './exception/connectionNotFound.exception';
import { DeleteConnectionException } from './exception/deleteConnection.exception';
import { ConnectionRequest } from 'src/connection-requests/connection-request.entity';
import { ConnectionRequestsService } from 'src/connection-requests/connection-requests.service';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectRepository(Connection)
    private readonly connectionRepository: Repository<Connection>,
  ) { }

  async getConnections(id: string) {
    console.log("hiii")
    let connections= await this.connectionRepository.find({
      where: [{ sender: { id, suspended: false } }, { receiver: { id, suspended: false } }],
      relations: [
        'sender',
        'receiver',
        'sender.profile',
        'receiver.profile',
        'sender.education',
        'receiver.education',
      ],
      order: { createdAt: "DESC" }
    });
    connections=connections.filter((item)=>item?.sender?.suspended!=true && item?.receiver?.suspended!=true)
    return connections;
  }


  async getConnection(id: string) {
    console.log("hiii")
    return this.connectionRepository.findOne({
      where: { id ,sender: { suspended: false },receiver: { suspended: false }},
      relations: ["sender", "receiver", "sender.profile", "receiver.profile"]
    })
  }
  //for dashboard
  async getAllConnections() {
    return this.connectionRepository.find({
      // where: { sender:{suspended:false},receiver:{suspended:false}},

      relations: [
        'sender',
        'receiver',
        'sender.profile',
        'receiver.profile',

      ],
      order: { createdAt: "DESC" }
    });
  }

  async getConnectionsById(id: string) {
    console.log("hiii")
    return await this.connectionRepository.findOne({
      // where: { id ,sender:{suspended:false},receiver:{suspended:false}},
     
      where: { id,sender: { suspended: false },receiver: { suspended: false } },
      relations: [
        'sender',
        'receiver',
        'sender.profile',
        'receiver.profile',
        'sender.education',
        'receiver.education',
      ],
    });
  }

  async deleteConnection({ id, userId }: DeleteConnectionRequestParams) {
    const connection = await this.getConnectionsById(id);
    if (!connection) throw new ConnectionNotFoundException();

    if (connection.receiver.id !== userId && connection.sender.id !== userId) {
      throw new DeleteConnectionException();
    }

    await this.connectionRepository.delete(id);

    return connection;
  }


  async deleteConnectionAdmin(id: string) {
    const connection = await this.getConnectionsById(id);
    console.log(connection)
    if (!connection) throw new ConnectionNotFoundException();



    await this.connectionRepository.delete(id);

    return connection;
  }


  async deleteConnectionOfUser(userId: string) {
    const deleteResponse = await this.connectionRepository
      .createQueryBuilder('connection')
      .leftJoinAndSelect('connection.sender', 'sender')
      .leftJoinAndSelect('connection.receiver', 'receiver')
      .delete()
      .from(Connection)
      .where('sender.id = :id', { id: userId })
      .orWhere('receiver.id = :id', { id: userId })
      .execute();

    if (!deleteResponse.affected) {
      // throw new HttpException(
      //   'No connections of users found',
      //   HttpStatus.NOT_FOUND,
      // );
    }
  }

  async isConnection(userOneId: string, userTwoId: string) {
    const connection = await this.connectionRepository.findOne({
      where: [
        { sender: { id: userOneId, suspended: false }, receiver: { id: userTwoId, suspended: false } },
        { sender: { id: userTwoId, suspended: false }, receiver: { id: userOneId, suspended: false } },
      ],
      relations: ['sender', 'receiver'],
    });
    // console.log(connection);
    return connection;
  }
}

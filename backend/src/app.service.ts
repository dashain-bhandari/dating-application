import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './users/user.entity';
import { Repository } from 'typeorm';
import { Connection } from './connection/connection.entity';
import { Email } from './email/emai.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Connection)
    private connectionRepository: Repository<Connection>,
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
  ) {

  }
  getHello(): string {
    return 'Hello World!';
  }

  async getStats() {
   try {
    let stats={
      user:0,
      connection:0,
      email:0
    };
let data:any;
     data =await  this.usersRepository.findAndCount();
    console.log(data)
    stats.user = data[1];
    data = await this.connectionRepository.findAndCount();
    stats.connection = data[1];
    data = await this.emailRepository.findAndCount();
    stats.email = data[1];
    console.log(stats)
    return stats;
   } catch (error:any) {
    console.log(error.message);
   }
  }
}

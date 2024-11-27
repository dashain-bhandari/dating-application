import Joi from 'joi';
import { Message } from 'src/message/message.entity';

import User from 'src/users/user.entity';

import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'conversations' })
export class Conversation {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ default: false })
  public readByCreator: boolean;

  @Column({ default: false })
  public readByRecepient: boolean;

  @Column({ default: false })
  public deletedByCreator: boolean;

  @Column({ default: false })
  public deletedByRecepient: boolean;

  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  creator: User;

  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  recepient: User;

  @OneToMany(() => Message, (message) => message.conversation, {
    cascade: ['insert', 'remove', 'update'],
  })
  
  @JoinColumn()
  messages: Message[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToOne(() => Message,{ onDelete: 'SET NULL' })
  @JoinColumn({ name: 'last_message_sent' })
  lastMessageSent: Message;

  @UpdateDateColumn({ name: 'updated_at' })
  lastMessageSentAt: Date;

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }
}

import { Call } from 'src/call/call.entity';
import { Conversation } from 'src/conversations/conversation.entity';
import { MessageAttachment } from 'src/message-attachments/message-attachments.entity';
import User from 'src/users/user.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Message {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  content: string;

  @Column({ default: false })
  read: boolean;

  @Column({ nullable: true })
  type: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.messages, {
    onDelete: 'CASCADE',
  })
  author: User;

  @Column('simple-array', { nullable: true })
  deletedBy: string[];

  @ManyToOne(() => Conversation, (conversation) => conversation.messages, {
    onDelete: 'CASCADE',
  })
  conversation: Conversation;

  @OneToOne(() => Call, (call) => call.message, {
    cascade: ['remove'],
  })
  @JoinColumn()
  call: Call;

  @OneToMany(
    () => MessageAttachment,
    (message_attachments) => message_attachments.message,
    { cascade: ['remove'] },
  )
  attachments: MessageAttachment[];

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }
}

import { Message } from 'src/message/message.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'message_attachments' })
export class MessageAttachment {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: true })
  fileName: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  originalFileName: string;

  @Column({ nullable: true })
  path: string;

  @ManyToOne(() => Message, (message) => message.attachments, {
    onDelete: 'CASCADE',
  })
  message: Message;

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }
}

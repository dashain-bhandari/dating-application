import { Message } from 'src/message/message.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'call' })
export class Call {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  startTime: Date;

  @Column({ nullable: true })
  endTime: Date;

  @OneToOne(() => Message, (message) => message.call, {
    onDelete: 'CASCADE',
  })
  message: Message;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }
}

import User from 'src/users/user.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FriendRequestStatus } from 'src/utils/types';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'connection_requests' })
export class ConnectionRequest {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  sender: User;

  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  receiver: User;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  status: FriendRequestStatus;

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }
}

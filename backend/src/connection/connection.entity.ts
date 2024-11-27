import User from 'src/users/user.entity';
import {
  BeforeInsert,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'connection' })
export class Connection {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(() => User, { createForeignKeyConstraints: false,onDelete:"CASCADE" })
  @JoinColumn()
  sender: User;

  @OneToOne(() => User, { createForeignKeyConstraints: false,onDelete:"CASCADE" })
  @JoinColumn()
  receiver: User;

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }
}

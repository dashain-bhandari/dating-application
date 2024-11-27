import User from 'src/users/user.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'email' })
export class Email {
  @PrimaryColumn('uuid')
  id: string;


  @Column({})
  public subject: string;

  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  receiver: User;


  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }
}

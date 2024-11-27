import User from 'src/users/user.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export default class Notification {
  @PrimaryColumn('uuid')
  public id: string;

  @ManyToOne(() => User, (user) => user.notification, {
    onDelete: 'CASCADE',
  })
  public user: User;

  @Column({ nullable: true })
  public type: string;

  @Column({ nullable: true })
  public heading: string;

  @Column({ nullable: true })
  public content: string;

  @Column({ default: false })
  public markAsRead: boolean;

  @ManyToOne(() => User, { createForeignKeyConstraints: false })
  public relatedUser: User;

  @CreateDateColumn()
  public createdAt: Date;

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }
}

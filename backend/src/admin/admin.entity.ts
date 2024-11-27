import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export default class Admin {
  @PrimaryColumn('uuid')
  public id: string;

  @Column()
  public username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  public password: string;

  @Column({ unique: true })
  public email: string;

  @Column({ default: new Date(Date.now()) })
  public createdAt: Date;

  @Column({ nullable: true })
  public currentHashedRefreshToken: string;

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }
}

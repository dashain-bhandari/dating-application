import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class ForgetPassword {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  forgetPasswordToken: string;

  @Column()
  forgetPasswordExpire: Date;

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }
}

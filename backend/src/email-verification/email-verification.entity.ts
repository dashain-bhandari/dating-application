import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class EmailVerification {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  emailVerificationToken: string;

  @Column()
  emailTokenExpire: string;

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }
}

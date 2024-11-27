import User from 'src/users/user.entity';
import {
  BeforeInsert,
  Entity,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Peer {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.peer)
  user: User;

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }
}

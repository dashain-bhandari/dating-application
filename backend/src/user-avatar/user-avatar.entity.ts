import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
class UserAvatar {
  @PrimaryColumn('uuid')
  public id: string;

  @Column()
  filename: string;

  @Column({
    type: 'bytea',
  })
  data: Uint8Array;

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }
}

export default UserAvatar;

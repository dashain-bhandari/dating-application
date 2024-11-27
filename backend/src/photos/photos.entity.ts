import User from 'src/users/user.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export default class Photos {
  @PrimaryColumn('uuid')
  public id: string;

  // @Column()
  // fileName: string;

  // @Column({ nullable: true })
  // originalFileName: string;

  // @Column({ nullable: true })
  // path: string;

   @Column()
  url: string;

  @ManyToOne(() => User, (user) => user.photos, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }
}

import User from 'src/users/user.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export default class Banner {
  @PrimaryColumn('uuid')
  public id: string;

  @Column({ nullable: true })
  fileName: string;

  @Column({ nullable: true })
  originalFileName: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  path: string;

  @OneToOne(() => User, (user) => user.banner, {
    onDelete: 'CASCADE',
  })
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

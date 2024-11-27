import User from 'src/users/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export default class Profile {
  @PrimaryColumn('uuid')
  public id: string;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  public user: User;

  @Column()
  public fullname: string;

  @Column()
  public height: string;

  @Column()
  public sex: string;

  @Column()
  public religion: string;

  @Column({ nullable: true })
  public caste: string;

  @Column({ nullable: true })
  public subcaste: string;

  @Column({ nullable: true })
  public profileCreatedFor: string;

  @Column()
  public marital_status: string;

  @Column({ nullable: true })
  public day: number;

  @Column({ nullable: true })
  public month: number;

  @Column({ nullable: true })
  public year: number;

  @Column({ nullable: true })
  public address: string;

  @Column({ nullable: true })
  public physicalDisability: string;



  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }


  
}

import Payment from 'src/payment/payment.entity';
import User from 'src/users/user.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, 
  OneToMany, 
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export default class  Order{
  @PrimaryColumn('uuid')
  public id: string;

  @ManyToOne(() => User, (user) => user.order, {
    onDelete: 'CASCADE',
  })
  public user: User;

  // @OneToMany(() => Payment, (payment) => payment.order, {
  //   cascade: ['remove'],
  // })
  // @JoinColumn()
  // payment: Payment[];



  @Column({ nullable:true })
  public package: number;

  @Column({nullable:true})
  public price: number;

 @Column({default:false})
  public paymentStatus: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }
}

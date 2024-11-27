import Order from 'src/order/order.entity';
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
export default class  Payment{
  @PrimaryColumn('uuid')
  public id: string;


  // @ManyToOne(() => Order, (order) => order.payment, {
  //   onDelete: 'CASCADE',
  // })
  // public order: Order;

  @Column({ nullable:false })
  public MerchantTxnId: string;

  @CreateDateColumn()
  public createdAt: Date;

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }
}

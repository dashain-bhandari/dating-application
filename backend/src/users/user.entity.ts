import { Exclude, Expose } from 'class-transformer';
import UserAvatar from 'src/user-avatar/user-avatar.entity';
import { Message } from 'src/message/message.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Profile from 'src/profile/profile.entity';
import Family from 'src/family/family.entity';
import Preferance from 'src/preferance/preferance.entity';
import EducationEntity from 'src/education/education.entity';
import { Peer } from 'src/peer/peer.entity';
import Photos from 'src/photos/photos.entity';
import Notification from 'src/notification/notification.entity';
import Order from 'src/order/order.entity';
import Banner from 'src/banner/banner.entity';
import { v4 as uuidv4 } from 'uuid';
import Subscription from 'src/subscriptions/subscriptions.entity';

import { Conversation } from 'src/conversations/conversation.entity';



class Payment {
  paymentStatus: boolean;
  time: number;
  paymentDate:Date;

  getSpentTime(){
     const time=Date.now() - this.paymentDate.getDate();
    
  }
}

@Entity()
class User {
  @PrimaryColumn('uuid')
  public id: string;

  @Column({ unique: true })
  public username: string;

  @Column({ type: "json", nullable: true })
  public payment: Payment;

  @Column('simple-array', { nullable: true })
  public profiles: string[];

  @Column({ nullable: true })
  public googleAvatar: string;

  @Column({ nullable: true })
  public lastReadNotification: string;

  @Column({ nullable: true, default: false })
  public emailVerified: boolean;

  @JoinColumn({ name: 'avatarId' })
  @OneToOne(() => UserAvatar, {
    cascade: ['remove'],
  })

  public avatar?: UserAvatar;

  @Column({ nullable: true })
  public avatarId?: string;

  @OneToOne(() => Banner, (banner) => banner.user, {
    cascade: ['remove'],
  })
  @JoinColumn()
  public banner: Banner;

  @Column({ nullable: true })
  @Exclude()
  public password: string;

  @Column({ unique: true })
  public email: string;

  @Column({ default: false })
  public profilestatus: boolean;


  @Column({ default: "user" })
  public role: string;

  @Column({ default: false })
  public suspended: boolean;

  @Column({ nullable: true })
  public currentHashedRefreshToken: string;

  @Column({ default: false })
  public isGoogleAuth: boolean;

  @Column({ default: false, nullable: true })
  public viewProfilePaymentStatus: boolean;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: ['remove'],
  })
  @JoinColumn()
  profile: Profile;

  @OneToOne(() => Family, (family) => family.user, {
    cascade: ['remove'],
  })
  @JoinColumn()
  family: Family;

  @OneToOne(() => Preferance, (preferance) => preferance.user, {
    cascade: ['remove'],
  })
  @JoinColumn()
  preferance: Preferance;

  @OneToOne(() => EducationEntity, (education) => education.user, {
    cascade: ['remove'],
  })
  @JoinColumn()
  education: EducationEntity;

  @OneToOne(() => Peer, (peer) => peer.user, {
    cascade: ['insert', 'remove', 'update'],
  })
  @JoinColumn()
  peer: Peer;

  @OneToMany(() => Photos, (photos) => photos.user, {
    cascade: ['remove'],
  })
  @JoinColumn()
  photos: Photos[];

  @OneToMany(() => Notification, (notification) => notification.user, {
    cascade: ['remove'],
  })
  @JoinColumn()
  notification: Notification[];

  @OneToMany(() => Order, (order) => order.user, {
    cascade: ['remove'],
  })
  @JoinColumn()
  order: Order[];

  @OneToMany(() => Message, (message) => message.author, {
    cascade: ['remove'],
  })
  @JoinColumn()
  messages: Message[];



  @OneToOne(()=>Subscription,(subscription)=>subscription.user)
  subscription:Subscription

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }
}

export default User;

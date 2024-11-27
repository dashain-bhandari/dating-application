import User from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, OneToOne, JoinColumn, PrimaryColumn, BeforeUpdate } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export default class Subscription {
    @PrimaryColumn('uuid')
  public id: string;

    @OneToOne(()=>User,(user)=>user.subscription,{onDelete:"CASCADE"})
    @JoinColumn()
    user: User;

    @CreateDateColumn({ type: 'timestamp' })
    startDate: Date;

    @Column({ type: 'int' })
    duration: number;

    @Column({default:"active"})
    status: string;

    @Column({ type: 'timestamp' })
    expiryDate: Date;

    @Column({ type: 'boolean', default: false })
    reminderSent: boolean;

    @BeforeInsert()
    @BeforeUpdate()
    setExpiryDate() {
        const startDate = new Date(this.startDate);
      
        startDate.setDate(startDate.getDate()+this.duration)
        this.expiryDate = startDate;
    }
    @BeforeInsert()
    generateUUID() {
      this.id = uuidv4();
    }
}

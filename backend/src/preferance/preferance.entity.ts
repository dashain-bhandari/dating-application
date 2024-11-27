import User from 'src/users/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export default class Preferance {
  @PrimaryColumn('uuid')
  public id: string;

  @OneToOne(() => User, (user) => user.preferance, {
    onDelete: 'CASCADE',
  })
  public user: User;

  @Column({ nullable: true })
  public minAge: string;

  @Column({ nullable: true })
  public maxAge: string;

  @Column()
  public maritalStatus: string;

  @Column({ nullable: true })
  public minHeight: string;

  @Column({ nullable: true })
  public maxHeight: string;

  @Column({ nullable: true })
  public sector: string;

  @Column({ nullable: true })
  public religion: string;

  @Column({ nullable: true })
  public caste: string;

  @Column({ nullable: true })
  public subcaste: string;

  @Column({ nullable: true })
  public motherTongue: string;

  @Column({ nullable: true })
  public education: string;

  @Column({ nullable: true })
  public subject: string;

  @Column({ nullable: true })
  public occupation: string;

  @Column({ nullable: true })
  public annualIncome: string;

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }
}

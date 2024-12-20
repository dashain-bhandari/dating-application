import { Transform } from 'class-transformer';
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
export default class EducationEntity {
  @PrimaryColumn('uuid')
  public id: string;

  @OneToOne(() => User, (user) => user.education, {
    onDelete: 'CASCADE',
  })
  public user: User;

  @Column()
  public education_degree: string;

  @Column({ nullable: true })
  public subject: string;

  @Column()
  public college: string;

  @Column()
  public occupation: string;

  @Column({ nullable: true })
  public annualIncome: string;

  @Column({ nullable: true })
  public sector: string;

  @Column({ nullable: true })
  public companyName: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4();
  }
}

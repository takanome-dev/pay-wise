import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'cards' })
export class Card {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: true })
  number: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  expiry: string;

  @Column({ nullable: true })
  cvv: string;

  @Column({ nullable: true })
  pin: string;

  @Column({ nullable: true })
  balance: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true, default: 'XOF' })
  currency: string;

  @ManyToOne(() => User, (user) => user.cards)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

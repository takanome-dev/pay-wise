import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'cards' })
export class Card {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  card_number: string;

  @Column()
  card_brand: string;

  @Column()
  card_type: string;

  @Column()
  expiry_date: string;

  @Column()
  card_cvv: string;

  @Column()
  card_pin: string;

  @Column({ default: 0 })
  card_balance: number;

  @Column({ nullable: true })
  card_status: string;

  @Column({ default: 'XOF' })
  card_currency: string;

  @ManyToOne(() => User, (user) => user.cards)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;
}

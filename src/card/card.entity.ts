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
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({ nullable: true })
  card_balance: string;

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
}

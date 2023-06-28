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

import { Customer } from '../customer/customer.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'cards' })
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cc_number: string;

  @Column()
  brand: string;

  @Column()
  type: string;

  @Column()
  exp_month: number;

  @Column()
  exp_year: number;

  @Column()
  cvv: string;

  // TODO: is this necessary?
  // @Column()
  // pin: string;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ default: 'inactive' })
  status: string;

  @Column({ default: 0 })
  balance: number;

  @ManyToOne(() => Customer, (customer) => customer.cards)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: Customer;

  @ManyToOne(() => User, (user) => user.cards)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'now()',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'now()',
  })
  updated_at: Date;

  @DeleteDateColumn({
    type: 'timestamp without time zone',
    select: false,
  })
  deleted_at: Date;
}

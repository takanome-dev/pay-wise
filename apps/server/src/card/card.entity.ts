import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  DeleteDateColumn,
  OneToMany,
  Relation,
} from 'typeorm';

import { Customer } from '../customer/customer.entity';
import { User } from '../user/user.entity';
import { Transaction } from '../transaction/transaction.entity';

@Entity({ name: 'cards' })
export class Card {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  readonly cc_number: string;

  @Column()
  readonly brand: string;

  @Column({ default: 'virtual' })
  readonly type: string;

  @Column()
  readonly exp_month: number;

  @Column()
  readonly exp_year: number;

  @Column()
  readonly cvv: string;

  @Column({ default: 'USD' })
  readonly currency: string;

  @Column({ default: 'active' })
  readonly status: string;

  @Column({ default: 0 })
  public balance: number;

  @ManyToOne(() => Customer, (customer) => customer.cards)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  readonly customer: Relation<Customer>;

  @ManyToOne(() => User, (user) => user.cards)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  readonly user: Relation<User>;

  @OneToMany(() => Transaction, (transaction) => transaction.card)
  readonly transactions: Relation<Transaction[]>;

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

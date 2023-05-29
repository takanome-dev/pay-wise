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

  @Column()
  pin: string;

  @Column({ nullable: true })
  status: string;

  @Column({ default: 0 })
  balance: number;

  @ManyToOne(() => Customer, (customer) => customer.cards)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: Customer;

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
    default: () => 'now()',
    select: false,
  })
  deleted_at: Date;
}

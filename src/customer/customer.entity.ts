import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Card } from '../card/card.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: 'customer' })
  role: string;

  @Column({ default: 'USD' })
  currency: string;

  @OneToMany(() => User, (user) => user.customer)
  user: User;

  @OneToMany(() => Card, (card) => card.customer)
  cards: Card[];

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

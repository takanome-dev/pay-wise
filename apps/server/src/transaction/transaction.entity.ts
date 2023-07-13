import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';
import { Card } from '../card/card.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ type: 'bigint' })
  readonly amount: number;

  @Column({ length: 100, default: 'pending' })
  readonly status: string;

  @Column({ length: 100 })
  readonly type: string;

  @Column({ nullable: true, length: 255 })
  readonly description: string;

  @ManyToOne(() => Card, (card) => card.transactions)
  @JoinColumn({ name: 'card_id', referencedColumnName: 'id' })
  readonly card: Relation<Card>;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  readonly user: Relation<User>;

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

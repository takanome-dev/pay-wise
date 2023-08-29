import { ApiHideProperty } from '@nestjs/swagger';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
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
  @ApiModelProperty({
    description: 'Transaction identifier',
    example: 'ff292ec0-a5fa-40b6-9be3-51dc7f32d304',
  })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiModelProperty({
    description: 'Transaction amount',
    example: 1000,
  })
  @Column({ type: 'bigint' })
  readonly amount: number;

  @ApiModelProperty({
    description: 'Transaction status',
    example: 'pending',
  })
  @Column({ type: 'text', default: 'pending' })
  readonly status: string;

  @ApiModelProperty({
    description: 'Transaction type',
    example: 'deposit',
  })
  @Column({ type: 'text' })
  readonly type: string;

  @ApiModelPropertyOptional({
    description: 'Transaction description',
    example: 'Deposit to card',
  })
  @Column({ type: 'text', nullable: true })
  readonly description: string;

  @ApiHideProperty()
  @ManyToOne(() => Card, (card) => card.transactions)
  @JoinColumn({ name: 'card_id', referencedColumnName: 'id' })
  readonly card: Relation<Card>;

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  readonly user: Relation<User>;

  @ApiModelProperty({
    description: 'Transaction created date',
    example: '2023-08-08T08:48:47.090Z',
  })
  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'now()',
  })
  created_at: Date;

  @ApiModelProperty({
    description: 'Transaction updated date',
    example: '2023-08-08T08:48:47.090Z',
  })
  @UpdateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'now()',
  })
  updated_at: Date;

  @ApiHideProperty()
  @DeleteDateColumn({
    type: 'timestamp without time zone',
    select: false,
  })
  deleted_at: Date;
}

import { ApiHideProperty } from '@nestjs/swagger';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
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
import { Transaction } from '../transaction/transaction.entity';
import { User } from '../user/user.entity';

/**
 *
 */
@Entity({ name: 'cards' })
export class Card {
  @ApiModelProperty({
    description: 'Card identifier',
    example: 'kajdakj-dakjda-dakjda-dakjda',
  })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiModelProperty({
    description: 'Card number',
    example: '4242424242424242',
  })
  @Column({ type: 'text' })
  readonly cc_number: string;

  @ApiModelProperty({
    description: 'Card brand',
    example: 'visa',
  })
  @Column({ type: 'text' })
  readonly brand: string;

  @ApiModelProperty({
    description: 'Card type',
    example: 'virtual',
  })
  @Column({ type: 'text', default: 'virtual' })
  readonly type: string;

  @ApiModelProperty({
    description: 'Card expiration month',
    example: 12,
  })
  @Column()
  readonly exp_month: number;

  @ApiModelProperty({
    description: 'Card expiration year',
    example: 2022,
  })
  @Column()
  readonly exp_year: number;

  @ApiModelProperty({
    description: 'Card cvv',
    example: '123',
  })
  @Column({ type: 'text' })
  readonly cvv: string;

  @ApiModelProperty({
    description: 'Card currency',
    example: 'USD',
  })
  @Column({ type: 'text', default: 'USD' })
  readonly currency: string;

  @ApiModelProperty({
    description: 'Card status',
    example: 'active',
  })
  @Column({ type: 'text', default: 'active' })
  readonly status: string;

  @ApiModelProperty({
    description: 'Card balance',
    example: 0,
  })
  @Column({ default: 0 })
  public balance: number;

  @ApiHideProperty()
  @ManyToOne(() => Customer, (customer) => customer.cards)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  readonly customer: Relation<Customer>;

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.cards)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  readonly user: Relation<User>;

  @ApiHideProperty()
  @OneToMany(() => Transaction, (transaction) => transaction.card)
  @JoinColumn({ name: 'transaction_id', referencedColumnName: 'id' })
  readonly transactions: Relation<Transaction[]>;

  @ApiModelPropertyOptional({
    description: 'Card created date',
    example: '2021-01-01T00:00:00.000Z',
  })
  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'now()',
  })
  created_at: Date;

  @ApiModelPropertyOptional({
    description: 'Card updated date',
    example: '2021-01-01T00:00:00.000Z',
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

import { ApiHideProperty } from '@nestjs/swagger';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Relation,
} from 'typeorm';

import { Card } from '../card/card.entity';
import { Customer } from '../customer/customer.entity';
import { Transaction } from '../transaction/transaction.entity';

/**
 *
 */
@Entity({ name: 'users' })
export class User {
  @ApiModelProperty({
    description: 'User identifier',
    example: 'kajdakj-dakjda-dakjda-dakjda',
  })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiModelPropertyOptional({
    description: 'User username',
    example: 'johndoe',
  })
  @Column({ unique: true, nullable: true, type: 'text' })
  readonly username: string;

  @ApiModelPropertyOptional({
    description: 'User first name',
    example: 'John',
  })
  @Column({ type: 'text', nullable: true })
  readonly first_name: string;

  @ApiModelPropertyOptional({
    description: 'User last name',
    example: 'Doe',
  })
  @Column({ type: 'text', nullable: true })
  readonly last_name: string;

  @ApiModelProperty({
    description: 'User email',
    example: 'johndoe@gmail.com',
  })
  @Column({ type: 'text', unique: true })
  readonly email: string;

  @ApiHideProperty()
  @Column({ type: 'text', nullable: true })
  readonly password: string;

  @ApiModelPropertyOptional({
    description: 'User phone number',
    example: '+234 123 456 7890',
  })
  @Column({ type: 'text', nullable: true })
  readonly phone: string;

  @ApiModelPropertyOptional({
    description: 'User city',
    example: 'Lagos',
  })
  @Column({ type: 'text', nullable: true })
  readonly city: string;

  @ApiModelPropertyOptional({
    description: 'User country',
    example: 'Nigeria',
  })
  @Column({ type: 'text', nullable: true })
  readonly country: string;

  @ApiModelPropertyOptional({
    description: 'User address',
    example: 'No 1, John Doe Street, Lagos, Nigeria',
  })
  @Column({ type: 'text', nullable: true })
  readonly address: string;

  @ApiModelPropertyOptional({
    description: 'User image',
    example: 'https://example.com/image.png',
  })
  @Column({ type: 'text', nullable: true })
  readonly image: string;

  @ApiModelProperty({
    description: 'User role',
    example: 'user',
  })
  @Column({ type: 'text', default: 'user' })
  readonly role: string;

  @ApiModelProperty({
    description: 'User is verified',
    example: true,
  })
  @Column({ default: false })
  readonly is_verified: boolean;

  @ApiHideProperty()
  @OneToMany(() => Customer, (customer) => customer.user)
  readonly customers: Relation<Customer[]>;

  @ApiHideProperty()
  @OneToMany(() => Card, (card) => card.user)
  readonly cards: Relation<Card[]>;

  @ApiHideProperty()
  @OneToMany(() => Transaction, (transaction) => transaction.user)
  readonly transactions: Relation<Transaction[]>;

  @ApiModelPropertyOptional({
    description: 'Date user was created',
    example: '11:54:58.440176+00',
  })
  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'now()',
  })
  readonly created_at: Date;

  @ApiModelPropertyOptional({
    description: 'Date user was updated',
    example: '11:54:58.440176+00',
  })
  @UpdateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'now()',
  })
  readonly updated_at: Date;

  @ApiHideProperty()
  @DeleteDateColumn({
    type: 'timestamp without time zone',
    select: false,
  })
  readonly deleted_at: Date;
}

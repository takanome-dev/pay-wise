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
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity({ name: 'customers' })
export class Customer {
  @ApiModelProperty({
    description: 'Customer identifier',
    example: 'ff292ec0-a5fa-40b6-9be3-51dc7f32d304',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiModelProperty({
    description: 'Customer fist name',
    example: 'John',
  })
  @Column({ type: 'text', nullable: true })
  first_name: string;

  @ApiModelProperty({
    description: 'Customer last name',
    example: 'Doe',
  })
  @Column({ type: 'text', nullable: true })
  last_name: string;

  @ApiModelProperty({
    description: 'Customer email',
    example: 'johndoe@gmail.com',
  })
  @Column({ type: 'text', unique: true })
  email: string;

  @ApiModelProperty({
    description: 'Customer phone',
    example: '08123456789',
  })
  @Column({ type: 'text', nullable: true })
  phone: string;

  @ApiModelProperty({
    description: 'Customer city',
    example: 'Jakarta',
  })
  @Column({ type: 'text', nullable: true })
  city: string;

  @ApiModelProperty({
    description: 'Customer country',
    example: 'Indonesia',
  })
  @Column({ type: 'text', nullable: true })
  country: string;

  @ApiModelProperty({
    description: 'Customer address',
    example: 'Kota Jakarta Selatan, Jakarta 12190',
  })
  @Column({ type: 'text', nullable: true })
  address: string;

  @ApiModelProperty({
    description: 'Customer role',
    example: 'customer',
  })
  @Column({ type: 'text', default: 'customer' })
  role: string;

  @ApiHideProperty()
  @OneToMany(() => User, (user) => user.customers)
  user: User;

  @ApiHideProperty()
  @OneToMany(() => Card, (card) => card.customer)
  cards: Card[];

  @ApiModelProperty({
    description: 'Customer created date',
    example: '2023-08-08T08:48:47.090Z',
  })
  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'now()',
  })
  created_at: Date;

  @ApiModelProperty({
    description: 'Customer updated date',
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

import { Type } from 'class-transformer';
import {
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { OrderDirectionEnum } from '../utils/constants';

export class RelationOptionsDto {
  // @ApiPropertyOptional({
  //   description: 'Relations to include',
  //   default: '',
  // })
  @IsString()
  @IsIn(['user', 'card', 'cards', 'user,card'])
  @IsOptional()
  readonly relations?: string;
}

export class PageOptionsDto {
  // @ApiPropertyOptional({
  //   minimum: 1,
  //   default: 1,
  // })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  // @ApiPropertyOptional({
  //   minimum: 1,
  //   maximum: 1000,
  //   default: 10,
  // })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10000)
  @IsOptional()
  readonly limit?: number = 50;

  // @ApiPropertyOptional({
  //   enum: OrderDirectionEnum,
  //   enumName: 'OrderDirectionEnum',
  //   default: OrderDirectionEnum.DESC,
  // })
  @IsEnum(OrderDirectionEnum)
  @IsOptional()
  readonly orderDirection?: OrderDirectionEnum = OrderDirectionEnum.DESC;

  /**
   *
   */
  get skip(): number {
    return ((this.page ?? 1) - 1) * (this.limit ?? 50);
  }
}

// import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { PageMetaDto } from './page-meta.dto';

/**
 *
 */
export class PageDto<T> {
  @IsArray()
  // @ApiProperty({ isArray: true })
  @ValidateNested({ each: true })
  @Type(() => Array)
  readonly data: T[];

  // @ApiProperty({ type: () => PageMetaDto })
  @ValidateNested()
  @Type(() => PageMetaDto)
  readonly meta: PageMetaDto;

  /**
   *
   * @param data
   * @param meta
   */
  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}

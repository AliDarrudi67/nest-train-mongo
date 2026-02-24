import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsPositive, IsString } from 'class-validator';

export enum Sort {
  Title = 'title',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
}
export class GeneralQueryDto {
  @IsOptional()
  @IsPositive()
  @ApiPropertyOptional()
  @Type(() => Number)
  page: number;
  @IsOptional()
  @IsPositive()
  @ApiPropertyOptional()
  @Type(() => Number)
  limit: number;
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(Sort)
  sort?: Sort;
}

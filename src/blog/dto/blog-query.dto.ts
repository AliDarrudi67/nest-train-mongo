import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, IsString } from 'class-validator';

export class BlogQueryDto {
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
}

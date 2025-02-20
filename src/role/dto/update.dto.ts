import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateDtoRole {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsArray()
  @IsOptional()
  permissions?: string[];
}

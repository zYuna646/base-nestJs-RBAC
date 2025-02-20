import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateDtoRole {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Name of the role', example: 'Admin' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Slug for the role',
    example: 'admin',
    required: false,
  })
  slug?: string;

  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @ApiProperty({
    description: 'List of permissions associated with the role',
    example: ['CREATE_USER', 'DELETE_USER'],
    required: false,
  })
  permissions?: string[];
}

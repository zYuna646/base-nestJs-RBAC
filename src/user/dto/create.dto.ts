import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateDto {
  @IsString()
  name: string;
}

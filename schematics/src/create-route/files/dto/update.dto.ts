import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateDto {
  @IsString()
  name: string;
}

import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateDto<%= classify(model) %> {
  @IsString()
  name: string;
}

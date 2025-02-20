import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateDto<%= classify(model) %> {
  @IsString()
  name: string;
}

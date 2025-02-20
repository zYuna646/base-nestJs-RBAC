import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsMongoId } from 'class-validator';

export class UpdateDtoUser {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Updated name of the user',
    example: 'Jane Doe',
    required: false,
  })
  name?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({
    description: 'Updated email address of the user',
    example: 'jane.doe@example.com',
    required: false,
  })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Updated password for the user account',
    example: 'newpassword123',
    required: false,
  })
  password?: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty({
    description: 'Updated role ID assigned to the user',
    example: '60d21b2f9e3fbd6d6c98e6b0',
    required: false,
  })
  role?: string;
}

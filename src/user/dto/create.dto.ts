import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsMongoId } from 'class-validator';

export class CreateDtoUser {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Password for the user account',
    example: 'password123',
  })
  password: string;

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Role ID assigned to the user',
    example: '60d21b2f9e3fbd6d6c98e6b0',
  })
  role: string;
}

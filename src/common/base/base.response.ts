import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse<T> {
  @ApiProperty({
    description: 'Status code of the response',
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Message describing the result of the operation',
    example: 'Request successful',
  })
  message: string;

  @ApiProperty({
    description: 'Data returned by the API, could be any type',
    type: Object,
    nullable: true,
    example: null,
  })
  data: T | null;

  @ApiProperty({
    description: 'Error message if the request fails',
    type: String,
    nullable: true,
    example: null,
  })
  error: string | null;

  constructor(
    statusCode: number,
    message: string,
    data: T | null = null,
    error: string | null = null,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}

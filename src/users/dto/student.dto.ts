import { ApiProperty } from '@nestjs/swagger';

export class StudentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false })
  class: string;

  @ApiProperty({ required: false })
  enrollment?: string;

  @ApiProperty()
  createdAt: Date;
}
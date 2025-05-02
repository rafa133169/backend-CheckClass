import { ApiProperty } from '@nestjs/swagger';

export class TeacherResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false })
  group?: string;

  @ApiProperty({ required: false })
  enrollment?: string;

  @ApiProperty()
  createdAt: Date;
}
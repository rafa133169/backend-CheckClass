import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: ['admin', 'teacher', 'student'] })
  role: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  group?: string;

  @ApiProperty({ required: false })
  enrollment?: string;

  @ApiProperty()
  createdAt: Date;
}
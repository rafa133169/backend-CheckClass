import { ApiProperty } from '@nestjs/swagger';

class StudentBasicInfoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  group?: string;

  @ApiProperty({ required: false })
  enrollment?: string;
}

export class AttendanceResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  time: string;

  @ApiProperty({ enum: ['Presente', 'Tardanza', 'Ausente'] })
  status: string;

  @ApiProperty({ required: false })
  reason?: string;

  @ApiProperty()
  student: StudentBasicInfoDto;

  @ApiProperty()
  classId: string;
}
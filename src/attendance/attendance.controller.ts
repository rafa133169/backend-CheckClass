import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Attendance } from './attendance.entity';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody,ApiProperty } from '@nestjs/swagger';
import { AttendanceResponseDto } from './dto/attendance-response.dto';

class CreateAttendanceDto {
  @ApiProperty({ description: 'ID del estudiante', example: 1 })
  studentId: number;

  @ApiProperty({ description: 'ID de la clase', example: 'math101' })
  classId: string;

  @ApiProperty({ description: 'Fecha de la asistencia', example: '2023-05-15' })
  date: Date;

  @ApiProperty({ description: 'Hora de la asistencia', example: '10:00' })
  time: string;

  @ApiProperty({ 
    enum: ['Presente', 'Tardanza', 'Ausente'],
    example: 'Presente'
  })
  status: 'Presente' | 'Tardanza' | 'Ausente';

  @ApiProperty({ 
    required: false,
    description: 'Razón de la ausencia/tardanza',
    example: 'Enfermedad'
  })
  reason?: string;

  @ApiProperty({ 
    required: false,
    description: 'Fecha de creación',
    example: '2023-05-15T10:00:00Z'
  })
  createdAt?: Date;

  @ApiProperty({ 
    required: false,
    description: 'Fecha de actualización',
    example: '2023-05-15T10:00:00Z'
  })
  updatedAt?: Date;
}

@ApiTags('attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @Roles('admin', 'teacher')
  @ApiOperation({ summary: 'Registrar una nueva asistencia' })
  @ApiBody({ type: CreateAttendanceDto })
  @ApiResponse({ status: 201, description: 'Asistencia registrada', type: Attendance })
  async create(@Body() attendanceData: CreateAttendanceDto): Promise<Attendance> {
    return this.attendanceService.create(attendanceData);
  }

  @Get('student/:studentId')
  @ApiOperation({ summary: 'Obtener asistencias por estudiante' })
  @ApiResponse({ status: 200, description: 'Listado de asistencias', type: [Attendance] })
  async findByStudent(@Param('studentId') studentId: number): Promise<Attendance[]> {
    return this.attendanceService.findByStudent(studentId);
  }

  @Get('class/:classId')
  @ApiOperation({ summary: 'Obtener asistencias por clase' })
  @ApiResponse({ status: 200, description: 'Listado de asistencias', type: [Attendance] })
  async findByClass(@Param('classId') classId: string): Promise<Attendance[]> {
    return this.attendanceService.findByClass(classId);
  }
  @Get()
@ApiOperation({ summary: 'Obtener todas las asistencias con información básica de estudiantes' })
@ApiResponse({ 
  status: 200, 
  description: 'Listado completo de asistencias',
  type: [AttendanceResponseDto] 
})
async getAllAttendance(): Promise<AttendanceResponseDto[]> {
  return this.attendanceService.findAllWithStudents();
}
}
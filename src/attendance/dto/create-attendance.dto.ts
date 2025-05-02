import { ApiProperty } from '@nestjs/swagger';

export class CreateAttendanceDto {
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
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassDto {
  @ApiProperty({ example: 'math101', description: 'ID único de la clase' })
  id: string;

  @ApiProperty({ example: 'Matemáticas 101', description: 'Nombre de la clase' })
  name: string;

  @ApiProperty({ example: 'Lunes y Miércoles 10:00-11:30', description: 'Horario de la clase' })
  schedule: string;

  @ApiProperty({ example: 2, description: 'ID del profesor asignado' })
  teacherId: number;
}
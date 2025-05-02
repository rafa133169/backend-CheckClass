import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'nuevo@email.com', required: false })
  email?: string;

  @ApiProperty({ example: 'nuevoNombre', required: false })
  name?: string;

  @ApiProperty({ example: 'Grupo B', required: false })
  group?: string;

  @ApiProperty({ example: '654321', required: false })
  enrollment?: string;
}
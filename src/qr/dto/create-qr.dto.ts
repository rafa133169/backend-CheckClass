import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateQrDto {
  @ApiProperty({ example: 'ABC123', description: 'Código único del QR' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'https://example.com/qr/ABC123', description: 'URL asociada al QR' })
  @IsString()
  url: string;

  @ApiProperty({ example: '2025-12-31T23:59:59', description: 'Fecha de expiración' })
  @IsDate()
  expiresAt: Date;

  @ApiProperty({ example: 'math101', description: 'ID de la clase asociada' })
  @IsString()
  classId: string;

  @ApiProperty({ example: 1, description: 'ID del profesor creador' })
  @IsNumber()
  teacherId: number;
}
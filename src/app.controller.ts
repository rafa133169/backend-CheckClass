import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('App') // Esto agrupa los endpoints bajo el nombre "App" en Swagger
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener el estado de la API' }) // Descripción del endpoint
  @ApiResponse({ status: 200, description: 'La API está en funcionamiento' }) // Respuesta exitosa
  getStatus() {
    return { status: 'API is running' };
  }
}

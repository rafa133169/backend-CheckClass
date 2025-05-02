import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { QrService } from './qr.service';
import { CreateQrDto } from './dto/create-qr.dto';

@ApiTags('qr')
@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generar un nuevo código QR' })
  @ApiBody({ type: CreateQrDto })
  @ApiResponse({ 
    status: 201, 
    description: 'QR generado y guardado en base de datos' 
  })
  async generateQr(@Body() createQrDto: CreateQrDto) {
    return this.qrService.create(createQrDto);
  }

  @Get('list')
  @ApiOperation({ summary: 'Listar todos los códigos QR' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista completa de QRs desde la base de datos' 
  })
  async listQrs() {
    return this.qrService.findAll();
  }
}
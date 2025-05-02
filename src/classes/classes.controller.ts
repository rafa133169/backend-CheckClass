import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { Class } from './class.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody,ApiProperty } from '@nestjs/swagger';
import { CreateClassDto } from './dto/create-class.dto';


@ApiTags('classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las clases' })
  @ApiResponse({ status: 200, description: 'Listado de clases', type: [Class] })
  async findAll(): Promise<Class[]> {
    return this.classesService.findAll();
  }

  @Post()
@Roles('admin', 'teacher')
@ApiOperation({ summary: 'Crear una nueva clase (solo admin o teacher)' })
@ApiBody({ type: CreateClassDto })
@ApiResponse({ status: 201, description: 'Clase creada exitosamente', type: Class })
async create(@Body() createClassDto: CreateClassDto): Promise<Class> {
  return this.classesService.create(createClassDto);
}
}

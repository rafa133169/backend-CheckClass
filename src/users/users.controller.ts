import { Controller, Post, Body, Patch, Param, UseGuards,Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
// import { RegisterDto, LoginDto, UpdateUserDto, UpdateRoleDto } from './dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { TeacherResponseDto } from './dto/teacher-response.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registro de nuevo usuario (role=student)' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'Usuario registrado' })
  async register(@Body() registerDto: RegisterDto) {
    return this.usersService.create({
      ...registerDto,
      role: 'student' // Asigna role student por defecto
    });
  }

  @Post('login')
  @ApiOperation({ summary: 'Inicio de sesión' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.usersService.validateUser(loginDto.email, loginDto.password);
    if (!user) throw new Error('Credenciales inválidas');
    return user;
  }

  @Patch(':id/role')
  @ApiOperation({ summary: 'Actualizar rol (solo admin)' })
  @ApiBody({ type: UpdateRoleDto })
  @ApiResponse({ status: 200, description: 'Rol actualizado' })
  async updateRole(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.usersService.update(id, { role: updateRoleDto.role });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar datos de usuario' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  @Get('students')
  @ApiOperation({ summary: 'Obtener todos los estudiantes' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de estudiantes',
    type: [UserResponseDto] // Asegúrate de tener definido el schema de User en Swagger
  })
  async getAllStudents() {
    return this.usersService.findAllStudents();
  }
  @Get('teachers')
@ApiOperation({ summary: 'Obtener todos los profesores' })
@ApiResponse({ 
  status: 200, 
  description: 'Lista de todos los usuarios con rol teacher',
  type: [TeacherResponseDto] // Usa el DTO de respuesta
})
async getAllTeachers() {
  return this.usersService.findAllTeachers();
}
}
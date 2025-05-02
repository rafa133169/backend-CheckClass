import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { TeacherResponseDto } from './dto/teacher-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(userData: {
    email: string;
    password: string;
    role: string;
    name: string;
  }): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.usersRepository.save(user);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async seedInitialData() {
    const existingUsers = await this.usersRepository.count();
    if (existingUsers === 0) {
      const initialUsers = [
        { 
          email: 'admin@escuela.com', 
          password: 'admin123', 
          role: 'admin', 
          name: 'Administrador' 
        },
        { 
          email: 'profesor@escuela.com', 
          password: 'profesor123', 
          role: 'teacher', 
          name: 'Profesor García' 
        },
        { 
          email: 'estudiante1@escuela.com', 
          password: 'estudiante123', 
          role: 'student', 
          name: 'Juan Pérez' 
        },
        { 
          email: 'estudiante2@escuela.com', 
          password: 'estudiante123', 
          role: 'student', 
          name: 'María López' 
        },
      ];

      for (const userData of initialUsers) {
        await this.create(userData);
      }
    }
  }
  async update(id: number, updateData: Partial<User>): Promise<User> {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    
    await this.usersRepository.update(id, updateData);
    
    const updatedUser = await this.findById(id);
    if (!updatedUser) {
      throw new Error('Usuario no encontrado');
    }
    
    return updatedUser;
  }
  async findAllStudents(): Promise<User[]> {
    return this.usersRepository.find({ 
      where: { role: 'student' },
      select: ['id', 'name', 'email', 'group', 'enrollment', 'createdAt'] // Excluye password
    });
  }
  async findAllTeachers(): Promise<TeacherResponseDto[]> {
    const teachers = await this.usersRepository.find({
      where: { role: 'teacher' },
      relations: ['classes'] // Si quieres incluir las clases que imparten
    });
  
    return teachers.map(teacher => ({
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      group: teacher.group,
      enrollment: teacher.enrollment,
      createdAt: teacher.createdAt
      // classes: teacher.classes // Si incluyes la relación
    }));
  }
}
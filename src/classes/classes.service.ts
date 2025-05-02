import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';
import { User } from '../users/user.entity';
import { CreateClassDto } from './dto/create-class.dto';



@Injectable()
export class ClassesService {
    constructor(
      @InjectRepository(Class)
      private classesRepository: Repository<Class>,
      @InjectRepository(User)
    private usersRepository: Repository<User>,
    ) {}
  
    async findAll(): Promise<Class[]> {
      return this.classesRepository.find({ relations: ['teacher'] });
    }
  
    async findById(id: string): Promise<Class> {
      const cls = await this.classesRepository.findOne({ 
        where: { id }, 
        relations: ['teacher'] 
      });
      
      if (!cls) {
        throw new NotFoundException(`Class with ID ${id} not found`);
      }
      
      return cls;
    }

    async create(createClassDto: CreateClassDto): Promise<Class> {
      // Verificar si el profesor existe
      const teacher = await this.usersRepository.findOne({ 
        where: { id: createClassDto.teacherId } 
      });
      
      if (!teacher) {
        throw new NotFoundException(`Teacher with ID ${createClassDto.teacherId} not found`);
      }
  
      // Crear la nueva clase
      const newClass = this.classesRepository.create({
        id: createClassDto.id,
        name: createClassDto.name,
        schedule: createClassDto.schedule,
        teacher: teacher, // Asignar la relación
        createdAt: new Date(),
        updatedAt: new Date()
      });
  
      return this.classesRepository.save(newClass);
    }

    async seedInitialData() {
      const existingClasses = await this.classesRepository.count();
      if (existingClasses === 0) {
        // Obtener un profesor existente (asumimos que existe el profesor con ID 2)
        const teacher = await this.usersRepository.findOne({ where: { id: 2 } });
        
        if (teacher) {
          const initialClasses = [
            { 
              id: 'math101', 
              name: 'Matemáticas 101', 
              schedule: 'Lunes y Miércoles 10:00-11:30',
              teacherId: teacher.id
            },
            { 
              id: 'physics201', 
              name: 'Física 201', 
              schedule: 'Martes y Jueves 14:00-15:30',
              teacherId: teacher.id
            },
          ];
    
          for (const classData of initialClasses) {
            await this.create(classData);
          }
        }
      }
    }
}
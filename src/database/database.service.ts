// src/database/database.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Class } from '../classes/class.entity';
import { Attendance } from '../attendance/attendance.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Class)
    private classesRepository: Repository<Class>,
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}

  async onModuleInit() {
    await this.seedUsers();
    await this.seedClasses();
    await this.seedAttendance();
  }

  private async seedUsers() {
    const count = await this.usersRepository.count();
    if (count === 0) {
      const users = [
        { email: 'admin@escuela.com', password: 'admin123', role: 'admin', name: 'Administrador' },
        { email: 'profesor@escuela.com', password: 'profesor123', role: 'teacher', name: 'Profesor García' },
        { email: 'estudiante1@escuela.com', password: 'estudiante123', role: 'student', name: 'Juan Pérez' },
        { email: 'estudiante2@escuela.com', password: 'estudiante123', role: 'student', name: 'María López' },
      ];

      for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await this.usersRepository.save({
          ...user,
          password: hashedPassword,
        });
      }
    }
  }

  private async seedClasses() {
    const count = await this.classesRepository.count();
    if (count === 0) {
      const teacher = await this.usersRepository.findOne({ where: { email: 'profesor@escuela.com' } });
      
      if (teacher) {
        const classes = [
          { id: 'math101', name: 'Matemáticas 101', schedule: 'Lunes y Miércoles 10:00-11:30', teacher },
          { id: 'physics201', name: 'Física 201', schedule: 'Martes y Jueves 14:00-15:30', teacher },
        ];

        await this.classesRepository.save(classes);
      }
    }
  }

  private async seedAttendance() {
    const count = await this.attendanceRepository.count();
    if (count === 0) {
      const student1 = await this.usersRepository.findOne({ where: { email: 'estudiante1@escuela.com' } });
      const student2 = await this.usersRepository.findOne({ where: { email: 'estudiante2@escuela.com' } });
      const mathClass = await this.classesRepository.findOne({ where: { id: 'math101' } });
      const physicsClass = await this.classesRepository.findOne({ where: { id: 'physics201' } });

      if (student1 && student2 && mathClass && physicsClass) {
        const attendanceRecords = [
          { student: student1, class: mathClass, date: new Date('2023-05-10'), time: '10:05', status: 'Presente' },
          { student: student2, class: mathClass, date: new Date('2023-05-10'), time: '10:07', status: 'Presente' },
          { student: student1, class: physicsClass, date: new Date('2023-05-11'), time: '14:15', status: 'Tardanza', reason: 'Llegó tarde por tráfico' },
        ];

        await this.attendanceRepository.save(attendanceRecords);
      }
    }
  }
}
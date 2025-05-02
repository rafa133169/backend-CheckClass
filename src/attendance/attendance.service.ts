import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
import { UsersService } from '../users/users.service';
import { ClassesService } from '../classes/classes.service';
import { AttendanceResponseDto } from './dto/attendance-response.dto';
import { User } from '../users/user.entity';
import { Class } from '../classes/class.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    private usersService: UsersService,
    private classesService: ClassesService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async create(attendanceData: CreateAttendanceDto): Promise<Attendance> {
    const { studentId, classId, ...attendanceDetails } = attendanceData;
    
    const student = await this.userRepository.findOneBy({ id: studentId });
    if (!student) throw new NotFoundException('Estudiante no encontrado');
  
    const cls = await this.classRepository.findOneBy({ id: classId });
    if (!cls) throw new NotFoundException('Clase no encontrada');
  
    const attendance = this.attendanceRepository.create({
      ...attendanceDetails,
      student,
      class: cls,
      createdAt: attendanceData.createdAt || new Date(),
      updatedAt: attendanceData.updatedAt || new Date()
    });
  
    return this.attendanceRepository.save(attendance);
  }

  async findByStudent(studentId: number): Promise<Attendance[]> {
    return this.attendanceRepository.find({
      where: { student: { id: studentId } },
      relations: ['class', 'student'],
    });
  }

  async findByClass(classId: string): Promise<Attendance[]> {
    return this.attendanceRepository.find({
      where: { class: { id: classId } },
      relations: ['student', 'class'],
    });
  }

  async seedInitialData() {
    const existingAttendance = await this.attendanceRepository.count();
    if (existingAttendance === 0) {
      const student1 = await this.usersService.findByEmail('estudiante1@escuela.com');
      const student2 = await this.usersService.findByEmail('estudiante2@escuela.com');
      const mathClass = await this.classesService.findById('math101');
      const physicsClass = await this.classesService.findById('physics201');

      if (!student1 || !student2 || !mathClass || !physicsClass) {
        throw new Error('Required seed data not found');
      }

      const initialAttendance = [
        {
          studentId: student1.id,
          classId: mathClass.id,
          date: new Date('2023-05-10'),
          time: '10:05',
          status: 'Presente' as const,
        },
        {
          studentId: student2.id,
          classId: mathClass.id,
          date: new Date('2023-05-10'),
          time: '10:07',
          status: 'Presente' as const,
        },
        {
          studentId: student1.id,
          classId: physicsClass.id,
          date: new Date('2023-05-11'),
          time: '14:15',
          status: 'Tardanza' as const,
          reason: 'Llegó tarde por tráfico',
        },
      ];

      for (const attendanceData of initialAttendance) {
        await this.create(attendanceData);
      }
    }
  }
  async findAllWithStudents(): Promise<AttendanceResponseDto[]> {
    const attendances = await this.attendanceRepository.find({
      relations: ['student', 'class'],
    });
  
    return attendances.map(attendance => ({
      id: attendance.id,
      date: attendance.date,
      time: attendance.time,
      status: attendance.status,
      reason: attendance.reason,
      classId: attendance.class.id,
      student: {
        id: attendance.student.id,
        name: attendance.student.name,
        group: attendance.student.group,
        enrollment: attendance.student.enrollment,
      },
    }));
  }
}
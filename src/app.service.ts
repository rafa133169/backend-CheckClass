import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { ClassesService } from './classes/classes.service';
import { AttendanceService } from './attendance/attendance.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private usersService: UsersService,
    private classesService: ClassesService,
    private attendanceService: AttendanceService,
  ) {}

  async onModuleInit() {
    await this.usersService.seedInitialData();
    
    const teacher = await this.usersService.findByEmail('profesor@escuela.com');
    await this.classesService.seedInitialData();
    
    await this.attendanceService.seedInitialData();
  }
}
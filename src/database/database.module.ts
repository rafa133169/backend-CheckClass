import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { User } from '../users/user.entity';
import { Class } from '../classes/class.entity';
import { Attendance } from '../attendance/attendance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Class, Attendance])],
  providers: [DatabaseService],
})
export class DatabaseModule {}

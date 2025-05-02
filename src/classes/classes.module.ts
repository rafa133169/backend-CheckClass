// src/classes/classes.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { Class } from './class.entity';
import { User } from 'src/users/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Class,User]),
    UsersModule,
  ],
  providers: [ClassesService],
  controllers: [ClassesController],
  exports: [ClassesService,TypeOrmModule], // Asegúrate de exportar el servicio si se usa en otros módulos
})
export class ClassesModule {}
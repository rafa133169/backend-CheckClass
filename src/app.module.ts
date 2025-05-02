// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/user.entity';
import { Class } from './classes/class.entity';
import { Attendance } from './attendance/attendance.entity';
import { QrCode } from './qr/qr-code.entity';
import { QrNotification } from './qr/qr-notification.entity';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';  // Importa UsersModule
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttendanceModule } from './attendance/attendance.module';
import { ClassesModule } from './classes/classes.module';
import { AuthModule } from './auth/auth.module';
import { QrModule } from './qr/qr.module';

@Module({
  imports: [
    // Cargar variables de entorno globalmente
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configuración de TypeORM usando variables de entorno
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Class, Attendance, QrCode, QrNotification],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    
    // Agregar el UsersModule
    UsersModule,
    AttendanceModule,
    ClassesModule,
    AuthModule,
    DatabaseModule,
    QrModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QrController } from './qr.controller';
import { QrService } from './qr.service';
import { QrCode } from './qr-code.entity';
import { Class } from '../classes/class.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([QrCode, Class, User]), // Registra las entidades
  ],
  controllers: [QrController],
  providers: [QrService],
})
export class QrModule {}
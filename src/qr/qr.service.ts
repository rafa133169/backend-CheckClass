import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QrCode } from './qr-code.entity';
import { CreateQrDto } from './dto/create-qr.dto';
import { Class } from '../classes/class.entity';
import { User } from '../users/user.entity';

@Injectable()
export class QrService {
  constructor(
    @InjectRepository(QrCode)
    private qrRepository: Repository<QrCode>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createQrDto: CreateQrDto): Promise<QrCode> {
    // Buscar las entidades relacionadas
    const classEntity = await this.classRepository.findOne({ 
      where: { id: createQrDto.classId } 
    });
    
    const teacher = await this.userRepository.findOne({ 
      where: { id: createQrDto.teacherId } 
    });

    if (!classEntity || !teacher) {
      throw new Error('Clase o profesor no encontrado');
    }

    const qr = this.qrRepository.create({
      code: createQrDto.code,
      url: createQrDto.url,
      expiresAt: createQrDto.expiresAt,
      class: classEntity,  // Usamos la entidad completa
      teacher: teacher,    // Usamos la entidad completa
      createdAt: new Date()
    });

    return this.qrRepository.save(qr);
  }

  async findAll(): Promise<QrCode[]> {
    return this.qrRepository.find({ 
      relations: ['class', 'teacher'] 
    });
  }
}
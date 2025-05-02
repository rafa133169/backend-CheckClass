import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Class } from '../classes/class.entity';
import { Attendance } from '../attendance/attendance.entity';
import { QrCode } from '../qr/qr-code.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['admin', 'teacher', 'student'] })
  role: string;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Class, (cls) => cls.teacher)
  classes: Class[];

  @Column({ nullable: true }) // Nuevo campo opcional
  enrollment?: string;
  @Column({ nullable: true }) // Nuevo campo opcional
  group?: string;

  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendances: Attendance[];

  @OneToMany(() => QrCode, (qrCode) => qrCode.teacher)
  qrCodes: QrCode[];
}
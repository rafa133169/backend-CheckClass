import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Attendance } from '../attendance/attendance.entity';
import { QrCode } from '../qr/qr-code.entity';
import { QrNotification } from '../qr/qr-notification.entity';

@Entity()
export class Class {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  schedule: string;

  @ManyToOne(() => User, (user) => user.classes)
  teacher: User;

  @OneToMany(() => Attendance, (attendance) => attendance.class)
  attendances: Attendance[];

  @OneToMany(() => QrCode, (qrCode) => qrCode.class)
  qrCodes: QrCode[];

  @OneToMany(() => QrNotification, (notification) => notification.class)
  notifications: QrNotification[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
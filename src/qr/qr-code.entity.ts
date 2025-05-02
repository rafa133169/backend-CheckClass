import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Class } from '../classes/class.entity';
import { User } from '../users/user.entity';

@Entity()
export class QrCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  url: string;

  @ManyToOne(() => Class, (cls) => cls.qrCodes)
  class: Class;

  @ManyToOne(() => User, (user) => user.qrCodes)
  teacher: User;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
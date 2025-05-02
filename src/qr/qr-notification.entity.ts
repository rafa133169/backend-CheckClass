import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Class } from '../classes/class.entity';

@Entity()
export class QrNotification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Class, (cls) => cls.notifications)
  class: Class;

  @Column({ type: 'bigint' })
  timestamp: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
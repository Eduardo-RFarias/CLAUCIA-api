import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import type { Wound } from '../../wound/entities/wound.entity';

@Entity('PATIENT')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column({ type: 'char', length: 1 })
  sex: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  photo: string;

  @OneToMany('Wound', (wound: Wound) => wound.patient)
  wounds: Wound[];
}

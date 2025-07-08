import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';
import type { Sample } from '../../sample/entities/sample.entity';

@Entity('WOUND')
export class Wound {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @Column({ type: 'varchar', length: 255 })
  origin: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  description?: string;

  @Column({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ name: 'FK_PATIENT_id' })
  patientId: number;

  @ManyToOne(() => Patient, (patient) => patient.wounds, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'FK_PATIENT_id', foreignKeyConstraintName: 'FK_WOUND_PATIENT_id' })
  patient: Patient;

  @OneToMany('Sample', (sample: Sample) => sample.wound)
  samples: Sample[];
}

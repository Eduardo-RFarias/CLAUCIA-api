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

import { Entity, PrimaryColumn, ManyToMany, OneToMany, Column } from 'typeorm';
import { Professional } from '../../professional/entities/professional.entity';
import type { Patient } from '../../patient/entities/patient.entity';

@Entity('INSTITUTION')
export class Institution {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  name: string;

  @ManyToMany(() => Professional, (professional) => professional.institutions)
  professionals: Professional[];

  @OneToMany('Patient', (patient: Patient) => patient.institution)
  patients: Patient[];

  @Column({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}

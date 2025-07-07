import { Entity, PrimaryColumn, ManyToMany, OneToMany } from 'typeorm';
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
}

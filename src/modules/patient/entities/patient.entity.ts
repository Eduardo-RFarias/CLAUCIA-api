import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import type { Wound } from '../../wound/entities/wound.entity';
import type { Institution } from '../../institution/entities/institution.entity';

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

  @Column({ type: 'varchar', length: 1024, nullable: true })
  medical_conditions?: string;

  @Column({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ name: 'institution_name', type: 'varchar', length: 255, nullable: false })
  institution_name: string;

  @ManyToOne('Institution', (institution: Institution) => institution.patients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'institution_name',
    referencedColumnName: 'name',
    foreignKeyConstraintName: 'FK_PATIENT_INSTITUTION_name',
  })
  institution: Institution;

  @OneToMany('Wound', (wound: Wound) => wound.patient)
  wounds: Wound[];
}

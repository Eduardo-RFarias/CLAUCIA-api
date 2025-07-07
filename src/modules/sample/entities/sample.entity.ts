import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Professional } from '../../professional/entities/professional.entity';
import type { Wound } from '../../wound/entities/wound.entity';

@Entity('SAMPLE')
export class Sample {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  photo: string;

  @Column({ type: 'int', nullable: true })
  ai_classification: number;

  @Column({ type: 'int', nullable: true })
  professional_classification: number;

  @Column({ type: 'float', nullable: true })
  height: number;

  @Column({ type: 'float', nullable: true })
  width: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ name: 'FK_WOUND_id' })
  woundId: number;

  @Column({ name: 'FK_PROFESSIONAL_coren', nullable: true })
  professionalCoren: string | null;

  @ManyToOne('Wound', (wound: Wound) => wound.samples, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'FK_WOUND_id', foreignKeyConstraintName: 'FK_SAMPLE_WOUND_id' })
  wound: Wound;

  @ManyToOne(() => Professional, (professional) => professional, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'FK_PROFESSIONAL_coren', foreignKeyConstraintName: 'FK_SAMPLE_PROFESSIONAL_coren' })
  professional: Professional | null;
}

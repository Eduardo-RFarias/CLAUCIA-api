import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Institution } from '../../institution/entities/institution.entity';

@Entity('PROFESSIONAL')
export class Professional {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  coren: string;

  @Column({ type: 'varchar', length: 255 })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  photo: string;

  @Column({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToMany(() => Institution, (institution) => institution.professionals)
  @JoinTable({
    name: 'works',
    joinColumn: {
      name: 'fk_PROFESSIONAL_coren',
      referencedColumnName: 'coren',
      foreignKeyConstraintName: 'FK_works_PROFESSIONAL_coren',
    },
    inverseJoinColumn: {
      name: 'fk_INSTITUTION_name',
      referencedColumnName: 'name',
      foreignKeyConstraintName: 'FK_works_INSTITUTION_name',
    },
  })
  institutions: Institution[];
}

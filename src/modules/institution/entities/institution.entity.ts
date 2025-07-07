import { Entity, PrimaryColumn, ManyToMany } from 'typeorm';
import { Professional } from '../../professional/entities/professional.entity';

@Entity('INTITUTION') // Note: Using the same table name as in the SQL script
export class Institution {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  name: string;

  @ManyToMany(() => Professional, (professional) => professional.institutions)
  professionals: Professional[];
}

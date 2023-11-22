import { Restaurante } from 'src/restaurante/entities/restaurante.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Resena {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  autor: string;

  @Column()
  texto: string;

  @Column()
  rating: string;

  @ManyToOne(() => Restaurante, (restaurante) => restaurante.resenas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'restauranteId' })
  restaurante: Restaurante;
}

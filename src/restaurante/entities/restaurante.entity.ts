import { Resena } from 'src/resena/entities/resena.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Restaurante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @Column()
  categoria: string;

  @Column()
  longitud: string;

  @Column()
  latitud: string;

  @Column({ type: 'text', nullable: true })
  foto: string;

  @Column()
  rating: string;

  @OneToMany(() => Resena, (resena) => resena.restaurante, { cascade: true })
  @JoinColumn({ name: 'resenas' })
  resenas: Resena[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

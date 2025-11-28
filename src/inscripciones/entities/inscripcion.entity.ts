import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from "typeorm";
import { IInscripcion } from "../interfaces/inscripcion.interface";
import { Curso } from "src/cursos/entities/curso.entity";
import { Estudiante } from "src/estudiantes/entities/estudiante.entity";

@Entity('inscripciones')
export class Inscripcion implements IInscripcion{
    @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha_inscripcion: Date;

  @Column({ type: 'decimal', nullable: true, default: null })
  nota: number | null;

  @Column()
  estudiante_id: number;

  @Column()
  curso_id: number;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.inscripciones, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'estudiante_id' })
  estudiante: Estudiante; 

  @ManyToOne(() => Curso, (curso) => curso.inscripciones, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'curso_id' })
  curso: Curso;
}
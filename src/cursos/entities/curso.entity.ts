import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { ICurso } from "../interfaces/curso.interface";
import { Profesor } from "src/profesores/entities/profesor.entity";
import { Inscripcion } from "src/inscripciones/entities/inscripcion.entity";

@Entity('cursos')
export class Curso implements ICurso{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nombre: string;

    @Column({ type: 'text' })
    descripcion: string;

    @Column('int')
    creditos: number;

   
    @Column()
    profesor_id: number; 

    @ManyToOne(() => Profesor, (profesor) => profesor.cursos, {
        nullable: false, 
        onDelete: 'RESTRICT',
    })
    @JoinColumn({ name: 'profesor_id' })
    profesor: Profesor;

    @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.curso)
    inscripciones: Inscripcion[];
}
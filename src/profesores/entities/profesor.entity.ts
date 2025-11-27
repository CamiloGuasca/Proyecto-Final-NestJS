import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { IProfesor } from "../interfaces/profesor.interface";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Curso } from "src/cursos/entities/curso.entity";

@Entity('profesores')
export class Profesor implements IProfesor{
  
    @PrimaryColumn()
    id: number;
    
    @Column()
    especialidad: string;

    @OneToOne(() => Usuario, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id' })
    usuario: Usuario;

    // Relación 1 a N con Cursos (añadir si ya estás ahí)
    @OneToMany(() => Curso, (curso) => curso.profesor)
    cursos: Curso[];
}
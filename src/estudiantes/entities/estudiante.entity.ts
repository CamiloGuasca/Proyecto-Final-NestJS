import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { IEstudiante } from "../interfaces/estudiante.interface";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Inscripcion } from "src/inscripciones/entities/inscripcion.entity";

@Entity('estudiantes')
export class Estudiante implements IEstudiante{
    @PrimaryColumn()
    id: number;

    @Column('int')
    ano_ingreso: number;

    @OneToOne(() => Usuario, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id' })
    usuario: Usuario;

    @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.estudiante)
    inscripciones: Inscripcion[];
}
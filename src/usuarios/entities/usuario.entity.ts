import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { IUsuario } from '../interfaces/usuario.interface';
import { Profesor } from 'src/profesores/entities/profesor.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';

@Entity('usuarios')
export class Usuario implements IUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre_completo: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  contraseña: string;

  @Column({ type: 'varchar' })
  rol: 'profesor' | 'estudiante';

  @OneToOne(() => Profesor, (profesor) => profesor.usuario)
    profesor: Profesor;

  @OneToOne(() => Estudiante, (estudiante) => estudiante.usuario)
  estudiante: Estudiante;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IUsuario } from '../interfaces/usuario.interface';

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
}

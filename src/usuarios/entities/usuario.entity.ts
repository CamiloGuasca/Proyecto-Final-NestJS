// src/usuarios/entities/usuario.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs'; // 👈 IMPORTANTE: Usar bcryptjs
import { IUsuario } from '../interfaces/usuario.interface';
import { Profesor } from 'src/profesores/entities/profesor.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';

@Entity('usuarios')
export class Usuario implements IUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre_completo' }) // Manteniendo el snake_case de tu DB
  nombre_completo: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  contraseña: string; // Manteniendo el nombre de tu columna

  @Column({ type: 'varchar' })
  rol: 'profesor' | 'estudiante';

  // ----------------------------------------------------
  // 1. HOOK DE ENCRIPTACIÓN (@BeforeInsert)
  // Se ejecuta justo antes de guardar la entidad por primera vez
  // ----------------------------------------------------
  @BeforeInsert()
  async hashPassword() {
    // 10 es el costo (cost) o número de rondas de hashing
    this.contraseña = await bcrypt.hash(this.contraseña, 10); 
  }

  // ----------------------------------------------------
  // 2. Método para comparar contraseñas (Útil en Autenticación)
  // ----------------------------------------------------
  async checkPassword(password: string): Promise<boolean> {
    // Compara la contraseña en texto plano con la encriptada en la DB (this.contraseña)
    return bcrypt.compare(password, this.contraseña);
  }


  // 3. RELACIONES (Cardinalidad corregida a OneToMany, aunque solo se use una vez)
  @OneToMany(() => Profesor, (profesor) => profesor.usuario)
  profesor: Profesor;

  @OneToMany(() => Estudiante, (estudiante) => estudiante.usuario)
  estudiante: Estudiante;
}
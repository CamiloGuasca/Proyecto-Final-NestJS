// src/usuarios/dto/create-usuario.dto.ts
import { IsEmail, IsEnum, IsNotEmpty, MinLength, ValidateIf, IsString, IsInt, Min } from 'class-validator';
import { RolUsuario } from '../enums/rol-usuario.enum';

export class CreateUsuarioDto {
  @IsNotEmpty({ message: 'El nombre completo es obligatorio.' })
  nombre_completo: string;

  @IsEmail({}, { message: 'El formato del correo es inválido.' })
  correo: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  contraseña: string; 

  @IsEnum(['profesor', 'estudiante'], {
    message: 'El rol debe ser profesor o estudiante',
  })
  rol: 'profesor' | 'estudiante';

  // Campo requerido SI el rol es 'profesor'
  @ValidateIf(o => o.rol === RolUsuario.PROFESOR)
  @IsString({ message: 'La especialidad es requerida para profesores.' })
  especialidad?: string;

  // Campo requerido SI el rol es 'estudiante'
  @ValidateIf(o => o.rol === RolUsuario.ESTUDIANTE)
  @IsInt({ message: 'El año de ingreso debe ser un número entero.' })
  @Min(2000) 
  ano_ingreso?: number;
}
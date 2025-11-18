import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  nombre_completo: string;

  @IsEmail()
  correo: string;

  @MinLength(6)
  contraseña: string;

  @IsEnum(['profesor', 'estudiante'], {
    message: 'El rol debe ser profesor o estudiante',
  })
  rol: 'profesor' | 'estudiante';
}

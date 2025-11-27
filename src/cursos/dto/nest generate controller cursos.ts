import { IsNotEmpty, IsString, IsNumber, IsPositive, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCursoDto {
  @IsNotEmpty({ message: 'El nombre del curso es obligatorio.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  nombre: string;

  @IsNotEmpty({ message: 'La descripción del curso es obligatoria.' })
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  descripcion: string;

  @IsNotEmpty({ message: 'Los créditos son obligatorios.' })
  @IsNumber({}, { message: 'Los créditos deben ser un número.' })
  @IsPositive({ message: 'Los créditos deben ser un valor positivo.' })
  @Type(() => Number)
  creditos: number;

  @IsNotEmpty({ message: 'El ID del profesor es obligatorio.' })
  @IsNumber({}, { message: 'El ID del profesor debe ser un número entero.' })
  @Type(() => Number)
  profesorId: number;
}
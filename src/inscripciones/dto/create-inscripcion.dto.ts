import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInscripcionDto {
  @IsNotEmpty({ message: 'El ID del estudiante es obligatorio.' })
  @IsNumber({}, { message: 'El ID del estudiante debe ser un número entero.' })
  @Type(() => Number)
  estudianteId: number;

  @IsNotEmpty({ message: 'El ID del curso es obligatorio.' })
  @IsNumber({}, { message: 'El ID del curso debe ser un número entero.' })
  @Type(() => Number)
  cursoId: number;

  @IsOptional()
  @IsNumber({}, { message: 'La nota debe ser un número.' })
  @Type(() => Number)
  nota?: number;
}
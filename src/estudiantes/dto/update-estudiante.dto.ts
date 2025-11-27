import { IsNumber, IsNotEmpty, IsInt, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

export class CreateEstudianteDto {
  @IsNotEmpty({ message: 'El año de ingreso es obligatorio.' })
  @IsNumber({}, { message: 'El año de ingreso debe ser un número.' })
  @IsInt({ message: 'El año de ingreso debe ser un número entero.' })
  @Min(2000, { message: 'El año de ingreso debe ser 2000 o posterior.' })
  @Type(() => Number)
  ano_ingreso: number;
}

export class UpdateEstudianteDto extends PartialType(CreateEstudianteDto) {}
import { PartialType } from '@nestjs/mapped-types';
import { CreateInscripcionDto } from './create-inscripcion.dto';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateInscripcionDto extends PartialType(CreateInscripcionDto) {
 
  @IsOptional()
  @IsNumber({}, { message: 'La nota debe ser un número.' })
  @Min(0.0, { message: 'La nota mínima es 0.0.' })
  @Max(5.0, { message: 'La nota máxima es 5.0.' })
  @Type(() => Number)
  nota?: number;
  
  estudianteId?: number;
  cursoId?: number;
}
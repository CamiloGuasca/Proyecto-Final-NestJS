import { PartialType } from '@nestjs/mapped-types';
import { CreateCursoDto } from './nest generate controller cursos';

export class UpdateCursoDto extends PartialType(CreateCursoDto) {}
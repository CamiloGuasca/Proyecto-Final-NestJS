import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscripcion } from 'src/inscripciones/entities/inscripcion.entity';
import { Profesor } from 'src/profesores/entities/profesor.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Profesor, Inscripcion])]
})
export class CursosModule {}

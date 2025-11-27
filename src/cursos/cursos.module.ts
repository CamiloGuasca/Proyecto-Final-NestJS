import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscripcion } from 'src/inscripciones/entities/inscripcion.entity';
import { Profesor } from 'src/profesores/entities/profesor.entity';
import { CursosController } from './cursos.controller';
import { ProfesoresModule } from 'src/profesores/profesores.module';
import { CursosService } from './cursos.service';
import { Curso } from './entities/curso.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([Profesor, Inscripcion, Curso]),
        ProfesoresModule
    ],
    controllers: [CursosController],
    providers: [CursosService],
    exports: [CursosService, TypeOrmModule]
})
export class CursosModule {}

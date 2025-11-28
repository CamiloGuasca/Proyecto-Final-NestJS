// src/inscripciones/inscripciones.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscripcion } from './entities/inscripcion.entity';
// Importamos los módulos para usar sus servicios en la validación de FK
import { EstudiantesModule } from '../estudiantes/estudiantes.module'; 
import { CursosModule } from '../cursos/cursos.module'; 
import { InscripcionesService } from './inscripciones.service';
import { InscripcionesController } from './inscripciones.controller'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Inscripcion]),
    EstudiantesModule,
    CursosModule,
  ],
  controllers: [InscripcionesController],
  providers: [InscripcionesService],
  exports: [InscripcionesService],
})
export class InscripcionesModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from 'src/cursos/entities/curso.entity';
import { Inscripcion } from 'src/inscripciones/entities/inscripcion.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Curso, Usuario, Inscripcion])],

})
export class EstudiantesModule {}

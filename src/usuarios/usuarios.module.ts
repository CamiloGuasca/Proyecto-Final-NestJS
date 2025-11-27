import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity';
import { Profesor } from 'src/profesores/entities/profesor.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { ProfesoresModule } from 'src/profesores/profesores.module';
import { EstudiantesModule } from 'src/estudiantes/estudiantes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    ProfesoresModule,
    EstudiantesModule,
  ],
  
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}

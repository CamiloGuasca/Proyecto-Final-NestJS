import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity';
import { Profesor } from 'src/profesores/entities/profesor.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Profesor, Estudiante])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}

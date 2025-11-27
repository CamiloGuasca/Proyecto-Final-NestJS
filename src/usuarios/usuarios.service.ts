import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { IUsuario } from './interfaces/usuario.interface';

import { Usuario } from './entities/usuario.entity';
import { Profesor } from 'src/profesores/entities/profesor.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';

import { ProfesoresService } from 'src/profesores/profesores.service';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly profesoresService: ProfesoresService, 
    private readonly estudiantesService: EstudiantesService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<IUsuario> {
    const { contrasena, rol, especialidad, ano_ingreso, ...datosUsuario } = createUsuarioDto;
    const hashedPassword = await bcrypt.hash(createUsuarioDto.contrasena, 10);
    const nuevoUsuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      contraseña: hashedPassword,
    });

    const usuario = await this.usuarioRepository.save(nuevoUsuario);

if (rol === 'profesor') {
      if (!especialidad) {
        throw new BadRequestException('El campo "especialidad" es requerido para profesores.');
      }
      await this.profesoresService.crearEspecializacion(usuario.id, especialidad as string); 
    } else if (rol === 'estudiante') {
      if (!ano_ingreso) {
        throw new BadRequestException('El campo "ano_ingreso" es requerido para estudiantes.');
      }
      await this.estudiantesService.crearEspecializacion(usuario.id, ano_ingreso as number);
    }

    return usuario as IUsuario;
  }

  async findAll(): Promise<IUsuario[]> {
    const usuarios = await this.usuarioRepository.find({
        relations: ['profesor', 'estudiante'], 
    });
    return usuarios as IUsuario[];
  }

  async findOne(id: number): Promise<IUsuario> {
    const usuario = await this.usuarioRepository.findOne({ 
        where: { id },
        relations: ['profesor', 'estudiante'], 
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario as IUsuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<IUsuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    if (updateUsuarioDto.correo) {
      const existeCorreo = await this.usuarioRepository.findOne({
        where: { correo: updateUsuarioDto.correo },
      });
  
      if (existeCorreo && existeCorreo.id !== id) {
        throw new BadRequestException(`El correo ${updateUsuarioDto.correo} ya está en uso`);
      }
    }
  
    Object.assign(usuario, updateUsuarioDto);

    if (updateUsuarioDto.contrasena) {
      usuario.contraseña = await bcrypt.hash(updateUsuarioDto.contrasena, 10);
    }
  
    const actualizado = await this.usuarioRepository.save(usuario);
    return actualizado as IUsuario;
  }
  
  async remove(id: number): Promise<{ mensaje: string }> {
    const result = await this.usuarioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return { mensaje: `Usuario con ID ${id} eliminado correctamente` };
  }

  async findOneByCorreo(correo: string): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.findOne({ where: { correo } });
    return usuario;
  }
}

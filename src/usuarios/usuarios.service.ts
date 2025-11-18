import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { IUsuario } from './interfaces/usuario.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<IUsuario> {
    const hashedPassword = await bcrypt.hash(createUsuarioDto.contraseña, 10);
    const nuevoUsuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      contraseña: hashedPassword,
    });
    const usuario = await this.usuarioRepository.save(nuevoUsuario);
    return usuario as IUsuario;
  }

  async findAll(): Promise<IUsuario[]> {
    const usuarios = await this.usuarioRepository.find();
    return usuarios as IUsuario[];
  }

  async findOne(id: number): Promise<IUsuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
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
  
    // Validar si el nuevo correo ya existe en otro usuario
    if (updateUsuarioDto.correo) {
      const existeCorreo = await this.usuarioRepository.findOne({
        where: { correo: updateUsuarioDto.correo },
      });
  
      if (existeCorreo && existeCorreo.id !== id) {
        throw new BadRequestException(`El correo ${updateUsuarioDto.correo} ya está en uso`);
      }
    }
  
    Object.assign(usuario, updateUsuarioDto);
  
    // Si se envía una nueva contraseña, la encripta
    if (updateUsuarioDto.contraseña) {
      usuario.contraseña = await bcrypt.hash(updateUsuarioDto.contraseña, 10);
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
}

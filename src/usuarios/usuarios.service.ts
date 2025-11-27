// src/usuarios/usuarios.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { IUsuario } from './interfaces/usuario.interface';
import { Usuario } from './entities/usuario.entity';

import { ProfesoresService } from 'src/profesores/profesores.service';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';

// ⚠️ Usamos bcryptjs para consistencia con la Entidad
import * as bcrypt from 'bcryptjs'; 

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly profesoresService: ProfesoresService, 
    private readonly estudiantesService: EstudiantesService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<IUsuario> { // ✅ Retorna IUsuario (singular)
    // Desestructuramos para obtener los datos de especialización y el 'rol' para la lógica.
    const { rol, especialidad, ano_ingreso, ...datosUsuario } = createUsuarioDto;
    
    // 1. Crear el objeto Usuario (la contraseña se hashea automáticamente en la Entidad).
    // 🛑 CORRECCIÓN: Volvemos a añadir 'rol' al objeto de creación para que TypeORM lo inserte, 
    // ya que la columna 'rol' es NOT NULL.
    const nuevoUsuario = this.usuarioRepository.create({
        ...datosUsuario as any, // Contiene nombre_completo, correo, contraseña
        rol, // 👈 SOLUCIÓN
    });
    
    // 2. Guardar y OBLIGAR A TYPESCRIPT a que lo tipée como un objeto singular 'Usuario'.
    const usuario = (await this.usuarioRepository.save(nuevoUsuario) as unknown) as Usuario;
    
    // 3. Lógica de Especialización
    if (rol === 'profesor') {
      if (!especialidad) {
        throw new BadRequestException('El campo "especialidad" es requerido para profesores.');
      }
      // Ahora usuario.id funciona correctamente
      await this.profesoresService.crearEspecializacion(usuario.id, especialidad as string); 
    } else if (rol === 'estudiante') {
      if (!ano_ingreso) {
        throw new BadRequestException('El campo "ano_ingreso" es requerido para estudiantes.');
      }
      // Ahora usuario.id funciona correctamente
      await this.estudiantesService.crearEspecializacion(usuario.id, ano_ingreso as number);
    }

    // El casting final a IUsuario es seguro
    return usuario as IUsuario; // ✅ Casting a IUsuario (singular)
  }

  async findAll(): Promise<IUsuario[]> { // ✅ Retorna IUsuario[] (plural)
    const usuarios = await this.usuarioRepository.find({
      relations: ['profesor', 'estudiante'], 
    });
    return usuarios as IUsuario[]; // ✅ Casting a IUsuario[] (plural)
  }

  async findOne(id: number): Promise<IUsuario> { // ✅ Retorna IUsuario (singular)
    const usuario = await this.usuarioRepository.findOne({ 
      where: { id },
      relations: ['profesor', 'estudiante'], 
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario as IUsuario; // ✅ Casting a IUsuario (singular)
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<IUsuario> { // ✅ Retorna IUsuario (singular)
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    if (updateUsuarioDto.correo) {
      // Usamos findOneBy para mejor práctica
      const existeCorreo = await this.usuarioRepository.findOneBy({
        correo: updateUsuarioDto.correo,
      });
  
      if (existeCorreo && existeCorreo.id !== id) { 
        throw new BadRequestException(`El correo ${updateUsuarioDto.correo} ya está en uso`);
      }
    }
  
    // Hashing manual en update (solo si se proporciona)
    if (updateUsuarioDto.contraseña) { 
      usuario.contraseña = await bcrypt.hash(updateUsuarioDto.contraseña, 10);
      delete updateUsuarioDto.contraseña; // Eliminamos del DTO para que Object.assign no sobrescriba el hash
    }
    
    Object.assign(usuario, updateUsuarioDto);
  
    const actualizado = await this.usuarioRepository.save(usuario);
    return actualizado as IUsuario; // ✅ Casting a IUsuario (singular)
  }
  
  async remove(id: number): Promise<{ mensaje: string }> {
    const result = await this.usuarioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return { mensaje: `Usuario con ID ${id} eliminado correctamente` };
  }

  async findOneByCorreo(correo: string): Promise<Usuario | null> {
    // Usamos findOneBy para mejor práctica
    const usuario = await this.usuarioRepository.findOneBy({ correo }); 
    return usuario;
  }
}
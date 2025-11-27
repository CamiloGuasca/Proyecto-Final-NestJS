// src/usuarios/usuarios.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards } from '@nestjs/common'; // 👈 AGREGAR UseGuards
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard'; 
import { Roles } from '../auth/roles.decorator';
import { RolUsuario } from './enums/rol-usuario.enum'; // 👈 IMPORTAR el ENUM de roles

@Controller('usuarios')
// Opcional: Aplicar los guards a nivel de controlador si la mayoría de rutas están protegidas
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // ==========================================================
  // CREATE: Solo Profesores pueden crear nuevos usuarios. REQUIERE LOGIN.
  // ==========================================================
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard) 
  @Roles(RolUsuario.PROFESOR) // Solo el rol 'profesor' puede crear usuarios
  create(@Body() data: CreateUsuarioDto) {
    return this.usuariosService.create(data);
  }

  // ==========================================================
  // READ ALL: Requiere LOGIN. Ambos roles pueden ver la lista.
  // ==========================================================
  @UseGuards(AuthGuard('jwt')) // Solo requiere Autenticación (JWT)
  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  // ==========================================================
  // READ ONE: Requiere LOGIN.
  // ==========================================================
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  // ==========================================================
  // UPDATE: Requiere LOGIN.
  // Podrías agregar lógica de Roles para permitir solo la edición de su propio perfil.
  // ==========================================================
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  // ==========================================================
  // DELETE: Solo Profesores pueden eliminar usuarios. REQUIERE LOGIN.
  // ==========================================================
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RolUsuario.PROFESOR) // Solo el rol 'profesor' puede eliminar
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
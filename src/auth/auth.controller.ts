// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto'; 

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const { correo, contraseña } = loginDto;
    
    // 1. Validar Usuario y Contraseña
    const usuarioValidado = await this.authService.validateUser(correo, contraseña);

    // 2. Generar y devolver el Token
    return this.authService.login(usuarioValidado);
  }
}
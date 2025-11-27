// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsuariosService } from '../usuarios/usuarios.service';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService, // Para buscar al usuario por correo
    private readonly jwtService: JwtService, // Para generar el token JWT
  ) {}

  /**
   * Valida las credenciales de un usuario.
   */
  async validateUser(correo: string, contrasena: string): Promise<any> {
    const usuario = await this.usuariosService.findOneByCorreo(correo);

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Usamos el método checkPassword que creamos en la Entidad Usuario
    const isMatch = await usuario.checkPassword(contrasena);

    if (isMatch) {
      // Retornamos el objeto Usuario, pero sin la contraseña
      const { contraseña, ...result } = usuario; 
      return result;
    }
    
    throw new UnauthorizedException('Credenciales inválidas');
  }
  
  /**
   * Genera el token JWT a partir de la información del usuario.
   */
  async login(usuario: any) {
    const payload = { 
      correo: usuario.correo, 
      sub: usuario.id, // El 'sub' es el ID del usuario
      rol: usuario.rol // Incluimos el rol para futuras autorizaciones (Guards)
    };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
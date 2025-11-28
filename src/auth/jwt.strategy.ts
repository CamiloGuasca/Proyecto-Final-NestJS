// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// Define la estructura básica del payload que firmaste en AuthService
export interface JwtPayload {
  correo: string;
  sub: number; // ID del usuario
  rol: 'profesor' | 'estudiante';
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del header Authorization
      ignoreExpiration: false, // Asegura que el token haya expirado
      secretOrKey: 'SECRETO_DURO_DE_ENCONTRAR_CAMBIAR_EN_PRODUCCION', // ⚠️ MISMA CLAVE SECRETA QUE EN auth.module.ts
    });
  }

  // Este método se ejecuta DESPUÉS de validar el token
  async validate(payload: JwtPayload) {
    // Retorna la información que se adjuntará al objeto Request (request.user)
    return { 
      userId: payload.sub, 
      correo: payload.correo, 
      rol: payload.rol 
    };
  }
}
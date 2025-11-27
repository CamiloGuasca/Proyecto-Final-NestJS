// src/auth/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Obtener los roles requeridos desde el decorador @Roles()
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    // Si no se especifican roles, la ruta es pública
    if (!requiredRoles) {
      return true;
    }

    // 2. Obtener la información del usuario del objeto Request (la adjunta JwtStrategy)
    // El usuario es inyectado por el AuthGuard (si se usa antes)
    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.rol) {
        return false; // No hay usuario o no tiene rol
    }

    // 3. Comprobar si el rol del usuario está en la lista de roles requeridos
    return requiredRoles.some((role) => user.rol === role);
  }
}
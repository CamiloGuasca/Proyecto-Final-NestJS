// src/auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

// Definimos la clave de metadatos (ROLE_KEY) y el decorador @Roles
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
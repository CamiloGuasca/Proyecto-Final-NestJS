// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';
import { ProfesoresModule } from './profesores/profesores.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { CursosModule } from './cursos/cursos.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';
import { CursosService } from './cursos/cursos.service';
import { AuthModule } from './auth/auth.module';

// =======================================================================
// 🛑 PASO DE DIAGNÓSTICO: Verificación de variables antes de la conexión
// =======================================================================
const logDbConfig = () => {
    console.log('================================================================');
    console.log('⚠️ VERIFICACIÓN DE VARIABLES DE ENTORNO PARA DB (TypeORM):');
    
    // Mostramos los valores leídos o los valores por defecto
    const host = process.env.DB_HOST || 'localhost (default)';
    const port = process.env.DB_PORT || '5432 (default)';
    const user = process.env.DB_USER || 'postgres (default)';
    const dbName = process.env.DB_NAME || 'edutrack (default)';
    
    // La contraseña nunca se debe imprimir, solo confirmamos si se cargó el valor
    const password = process.env.DB_PASSWORD ? '******** (Contraseña leída)' : '******** (Contraseña por defecto)';

    console.log('HOST:     ', host);
    console.log('PORT:     ', port);
    console.log('USER:     ', user);
    console.log('PASSWORD: ', password);
    console.log('DATABASE: ', dbName);
    console.log('================================================================');
};

logDbConfig(); // 👈 Llamada para que se ejecute al iniciar la aplicación

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '12345Ian.', // ⚠️ Si falla, esta es la contraseña por defecto
      database: process.env.DB_NAME || 'edutrack',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    UsuariosModule,
    ProfesoresModule,
    EstudiantesModule,
    CursosModule,
    InscripcionesModule,
    AuthModule,
  ],
  providers: [CursosService],
})
export class AppModule {}
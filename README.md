🚀 PROYECTO FINAL: EduTrack - Sistema de Gestión Académica (Backend NestJS)
Este proyecto final consiste en la implementación de una API RESTful completa para un Sistema de Gestión Académica (EduTrack). El objetivo es demostrar el dominio del framework NestJS y la aplicación de buenas prácticas de desarrollo backend, incluyendo la persistencia de datos mediante TypeORM y la implementación de un sistema robusto de seguridad basado en JWT y Roles.

💻 Tecnologías y Componentes Clave
El proyecto está construido bajo la arquitectura de NestJS y utiliza los siguientes componentes principales:

Framework: NestJS (versión estable).

Lenguaje: TypeScript.

Base de Datos: PostgreSQL.

ORM (Mapeo Objeto-Relacional): TypeORM.

Seguridad: JSON Web Tokens (JWT), Passport Strategies y Bcrypt (para la encriptación de contraseñas).

Validación: DTOs con class-validator.

📂 Estructura del Proyecto
El repositorio está dividido en dos partes principales, siguiendo la convención de un proyecto monolítico con frontend desacoplado:

Proyecto-Final-NestJS/: Contiene todo el código fuente del Backend (NestJS).

src/auth/: Módulo de Autenticación, JWT Strategies y Guards.

src/usuarios/: Gestión de las entidades Profesor y Estudiante (CRUD completo).

src/cursos/: Gestión de la oferta académica.

src/inscripciones/: Módulo para manejar la relación Muchos a Muchos (N:M) entre Estudiantes y Cursos.

frontend/: Contiene la interfaz gráfica básica (HTML/JavaScript) para probar y consumir la API.

⚙️ Requisitos Previos
Antes de comenzar, asegúrate de tener instalados los siguientes programas y servicios:

Node.js (LTS o superior).

Git.

Base de Datos PostgreSQL (en ejecución local o remota).

Postman (o herramienta similar) para probar los endpoints.

🛠️ Instalación y Configuración
Sigue estos pasos para configurar y ejecutar la aplicación localmente:

1. Clonar el Repositorio
Bash

git clone [URL_DE_TU_REPOSITORIO]
cd Proyecto-Final-NestJS
2. Instalar Dependencias
Bash

npm install
3. Configurar Variables de Entorno
Crea un archivo llamado .env en el directorio raíz del backend (Proyecto-Final-NestJS/). Este archivo contendrá las credenciales de la base de datos y la clave secreta para el JWT.

Contenido del archivo .env:

Fragmento de código

# Configuración de la Base de Datos
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario_postgres
DB_PASSWORD=tu_contraseña_postgres
DB_DATABASE=edutrack_db

# Configuración de Seguridad JWT
JWT_SECRET=UNA_CLAVE_SECRETA_LARGA_Y_COMPLEJA_AQUI
JWT_EXPIRES_IN=1h
4. Ejecutar el Servidor
Bash

npm run start:dev
El servidor de NestJS estará disponible en http://localhost:3000.

🧪 Pruebas y Uso (Autenticación y Roles)
El sistema implementa un control de acceso basado en roles. Solo el rol profesor tiene permisos para gestionar recursos (CRUD).

1. Cuentas de Prueba
Utiliza estas credenciales para las pruebas de roles:

Profesor (Administrador de Contenido):

Correo: profesor@test.com

Contraseña: password

Estudiante (Usuario Básico):

Correo: estudiante@test.com

Contraseña: password

2. Flujo de Prueba en Postman
Para probar las rutas protegidas, primero debe obtener el token:

Obtener Token (Login):

Método: POST

URL: http://localhost:3000/auth/login

Resultado: Copie el valor de access_token para el siguiente paso.

Acceder a Ruta Protegida (Ejemplo):

Método: GET

URL: http://localhost:3000/usuarios

Cabecera: Authorization: Bearer [TOKEN_COMPLETO]

Prueba de Éxito (Profesor): Devolverá 200 OK con la lista de usuarios.

Prueba de Falla (Estudiante): Devolverá 403 Forbidden (Demuestra el funcionamiento del RolesGuard).

3. Interfaz Gráfica (Frontend)
La carpeta frontend/index.html sirve como una demostración de la seguridad:

Si inicia sesión como Profesor, verá el Token JWT y las opciones de gestión.

Si inicia sesión como Estudiante, solo verá un mensaje de bienvenida personalizado y la sección de gestión estará oculta.

🛡️ Características de Seguridad Implementadas
Autenticación JWT: Utilización de JSON Web Tokens para manejar las sesiones de usuario de forma stateless.

Bcrypt: Todas las contraseñas se encriptan con bcrypt antes de ser almacenadas en la base de datos.

RolesGuard: Implementación de un Guard personalizado (@Roles('profesor')) para restringir el acceso a los endpoints sensibles (CRUD de Usuarios, Cursos, Inscripciones) únicamente al rol profesor.
Desarrolladores

ianjaner alfonso beltran 
camilo andres guasca bulla
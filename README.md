Proyecto Final – Backend con NestJS
Descripción General

Este proyecto corresponde al desarrollo del backend del sistema EduTrack, realizado como parte del curso de Desarrollo Backend con NestJS.
El objetivo principal es implementar una API RESTful que gestione la información de usuarios, aplicando buenas prácticas de arquitectura, encriptación de contraseñas y validaciones.
La aplicación está desarrollada con el framework NestJS, utilizando TypeORM para la comunicación con la base de datos PostgreSQL.

En esta primera fase se implementa el módulo de usuarios, con todas sus operaciones CRUD (crear, leer, actualizar y eliminar). Además, las contraseñas se almacenan de forma segura usando la librería bcrypt.
Posteriormente se integrarán las demás entidades definidas en el proyecto (Profesor, Estudiante, Curso e Inscripción).

Requisitos Previos

Antes de ejecutar el proyecto, es necesario tener instalado lo siguiente:

Node.js (versión recomendada: 18 o superior)

npm (incluido con Node.js)

PostgreSQL (versión 14 o superior)

pgAdmin4 (opcional, para gestionar la base de datos gráficamente)

Instalación del Proyecto

Clonar el repositorio o descargar el proyecto.

git clone <URL-del-repositorio>
cd Proyecto-Final-NestJS


Instalar las dependencias.

npm install


Configurar las variables de entorno.

En el archivo .env.template.
Cópialo y renómbralo como .env, y actualiza los valores según tu configuración local:

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=edutrack

NOTA:SI hay variables de entorno con estos valores cambiarlos y reiniciar la computadora para que agarre los valores si no generara error....

Verificar la conexión con PostgreSQL.
Crea manualmente la base de datos en pgAdmin4 con el mismo nombre definido en DB_NAME.

Ejecución del Proyecto

Para ejecutar el proyecto en modo desarrollo, utiliza el siguiente comando:

npm run start:dev


Si todo está correctamente configurado, en la consola aparecerá el mensaje:

[Nest] ...  - Nest application successfully started


La aplicación se ejecutará por defecto en:

http://localhost:3000


Endpoints Disponibles

Base URL: http://localhost:3000/usuarios

Método	Endpoint	Descripción
POST	/usuarios	Crear un nuevo usuario
GET	/usuarios	Listar todos los usuarios
GET	/usuarios/:id	Obtener un usuario por su ID
PATCH	/usuarios/:id	Actualizar un usuario existente
DELETE	/usuarios/:id	Eliminar un usuario por su ID
Pruebas en Postman

Para verificar el funcionamiento de la API, se recomienda usar Postman .

1. Crear un Usuario (POST)

URL: http://localhost:3000/usuarios

Body (JSON):

{
  "nombre_completo": "Ian Beltrán",
  "correo": "ianbeltran@example.com",
  "contraseña": "12345Ian.",
  "rol": "profesor"
}


Respuesta esperada:

{
  "id": 1,
  "nombre_completo": "Ian Beltrán",
  "correo": "ianbeltran@example.com",
  "rol": "profesor"
}


Nota: la contraseña se guarda en la base de datos de forma encriptada mediante bcrypt.}


2. Obtener Todos los Usuarios (GET)

URL: http://localhost:3000/usuarios

Respuesta esperada:

[
  {
    "id": 1,
    "nombre_completo": "Ian Beltrán",
    "correo": "ianbeltran@example.com",
    "rol": "profesor"
  }
]

3. Actualizar un Usuario (PATCH)

URL: http://localhost:3000/usuarios/1

Body (JSON):

{
  "nombre_completo": "Ian Alfonso Beltrán",
  "correo": "ianbeltran@example.com",
  "contraseña": "nuevaClave123",
  "rol": "profesor"
}


Validación especial:
Si el correo ya existe, el servidor mostrará en consola:

Error: El correo ianbeltran@example.com ya está en uso


Y Postman devolverá una respuesta:

{
  "statusCode": 400,
  "message": "El correo ianbeltran@example.com ya está en uso"
}

4. Eliminar un Usuario (DELETE)

URL: http://localhost:3000/usuarios/1

Respuesta esperada:

{
  "mensaje": "Usuario con ID 1 eliminado correctamente"
}

Tecnologías Utilizadas

NestJS – Framework backend basado en Node.js y TypeScript

TypeORM – ORM para modelar y conectar con PostgreSQL

PostgreSQL – Base de datos relacional

bcrypt – Encriptación segura de contraseñas

class-validator / class-transformer – Validación de datos en los DTOs

Próximas Fases

En las siguientes etapas del proyecto se integrarán los siguientes módulos adicionales:

Profesor (especialización de usuario con campo especialidad)

Estudiante (especialización con campo año_ingreso)

Curso (asignado a un profesor)

Inscripción (relación entre estudiantes y cursos)

Estas entidades estarán relacionadas mediante decoradores de TypeORM, cumpliendo con las relaciones 1:1 y 1:N definidas en el enunciado del proyecto.
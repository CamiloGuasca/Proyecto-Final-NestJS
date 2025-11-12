export interface IUsuario {
    id?: number;
    nombre_completo: string;
    correo: string;
    contraseña: string;
    rol: 'profesor' | 'estudiante';
  }
  
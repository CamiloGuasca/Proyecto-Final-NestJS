export interface IInscripcion{
    id?: number;
    fecha_inscripcion: Date;
    nota: number | null; 
    estudiante_id: number;
    curso_id: number;
}
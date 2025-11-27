import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';


@Injectable()
export class EstudiantesService {
    constructor(
        @InjectRepository(Estudiante)
        private readonly estudiantesRepository: Repository<Estudiante>,
    ){}

    async crearEspecializacion(id_usuario: number, ano_ingreso: number): Promise<Estudiante> {
    const nuevoEstudiante = this.estudiantesRepository.create({ // AHORA FUNCIONA
      id: id_usuario, 
      ano_ingreso: ano_ingreso,
    });
    return this.estudiantesRepository.save(nuevoEstudiante);
  }
}

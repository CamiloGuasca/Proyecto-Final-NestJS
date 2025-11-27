import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ) {}

    async crearEspecializacion(id_usuario: number, ano_ingreso: number): Promise<Estudiante> {
    const nuevoEstudiante = this.estudianteRepository.create({
      id: id_usuario, 
      ano_ingreso: ano_ingreso,
    });
    return this.estudianteRepository.save(nuevoEstudiante);
  }
  
    async findAll(): Promise<Estudiante[]> {

      return this.estudianteRepository.find({ relations: ['usuario', 'inscripciones'] });
  }

    async findOne(id: number): Promise<Estudiante> {
      const estudiante = await this.estudianteRepository.findOne({ 
          where: { id },
          relations: ['usuario', 'inscripciones'] 
      });
      if (!estudiante) {
          throw new NotFoundException(`Estudiante con ID ${id} no encontrado.`);
      }
      return estudiante;
  }

    async update(id: number, updateEstudianteDto: UpdateEstudianteDto): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOneBy({ id });
      if (!estudiante) {
          throw new NotFoundException(`Estudiante con ID ${id} no encontrado.`);
      }

      Object.assign(estudiante, updateEstudianteDto);
      return this.estudianteRepository.save(estudiante);
  }

    async remove(id: number): Promise<{ mensaje: string }> {
      const result = await this.estudianteRepository.delete(id);

      if (result.affected === 0) {
          throw new NotFoundException(`Estudiante con ID ${id} no encontrado.`);
      }

      return { mensaje: `Especialización de Estudiante con ID ${id} eliminada. El usuario base (identidad) sigue existiendo.` };
  }
}
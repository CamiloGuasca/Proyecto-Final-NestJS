import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesor } from './entities/profesor.entity';
//import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Injectable()
export class ProfesoresService {
  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
  ) {}

  async crearEspecializacion(id_usuario: number, especialidad: string): Promise<Profesor> {
    const nuevoProfesor = this.profesorRepository.create({
      id: id_usuario, 
      especialidad: especialidad,
    });
    return this.profesorRepository.save(nuevoProfesor);
  }

  async findAll(): Promise<Profesor[]> {
      return this.profesorRepository.find({ relations: ['usuario', 'cursos'] });
  }

  async findOne(id: number): Promise<Profesor> {
      const profesor = await this.profesorRepository.findOne({ 
          where: { id },
          relations: ['usuario', 'cursos'] 
      });
      if (!profesor) {
          throw new NotFoundException(`Profesor con ID ${id} no encontrado.`);
      }
      return profesor;
  }

  /*
  async update(id: number, updateProfesorDto: UpdateProfesorDto): Promise<Profesor> {
      // Buscamos solo la entidad Profesor para actualizar sus campos
      const profesor = await this.profesorRepository.findOneBy({ id });
      if (!profesor) {
          throw new NotFoundException(`Profesor con ID ${id} no encontrado.`);
      }

      // Aplicamos cambios a la especialidad (u otros campos especializados)
      Object.assign(profesor, updateProfesorDto);
      return this.profesorRepository.save(profesor);
  }
*/
  // 5. DELETE
  async remove(id: number): Promise<{ mensaje: string }> {
      // ⚠️ NOTA IMPORTANTE: Al eliminar el registro de la tabla 'profesores', 
      // el registro de la tabla 'usuarios' NO se borra. 
      // Para borrar el usuario completo, se debe usar el endpoint de /usuarios/:id.
      
      const result = await this.profesorRepository.delete(id);

      if (result.affected === 0) {
          throw new NotFoundException(`Profesor con ID ${id} no encontrado.`);
      }
      
      return { mensaje: `Especialización de Profesor con ID ${id} eliminada. El usuario base (identidad) sigue existiendo.` };
  }
}
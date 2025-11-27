import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Curso } from './entities/curso.entity';
import { CreateCursoDto } from './dto/nest generate controller cursos';
import { UpdateCursoDto } from './dto/update-curso.dto';

import { ProfesoresService } from '../profesores/profesores.service'; 

@Injectable()
export class CursosService {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
    private readonly profesoresService: ProfesoresService, 
  ) {}


  async create(createCursoDto: CreateCursoDto): Promise<Curso> {
    const { profesorId, ...cursoData } = createCursoDto;
    const profesorExiste = await this.profesoresService.findOne(profesorId);
    if (!profesorExiste) {
      throw new BadRequestException(`El Profesor con ID ${profesorId} no fue encontrado.`);
    }

    const nuevoCurso = this.cursoRepository.create({
      ...cursoData,
      profesor_id: profesorId,
    });
    
    return this.cursoRepository.save(nuevoCurso);
  }

  async findAll(): Promise<Curso[]> {
    return this.cursoRepository.find({ relations: ['profesor'] });
  }

  async findOne(id: number): Promise<Curso> {
    const curso = await this.cursoRepository.findOne({ 
      where: { id },
      relations: ['profesor'],
    });

    if (!curso) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado.`);
    }
    return curso;
  }

  async update(id: number, updateCursoDto: UpdateCursoDto): Promise<Curso> {
    const curso = await this.cursoRepository.findOneBy({ id });
    if (!curso) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado.`);
    }

    if (updateCursoDto.profesorId && updateCursoDto.profesorId !== curso.profesor_id) {
      const profesorExiste = await this.profesoresService.findOne(updateCursoDto.profesorId);
      if (!profesorExiste) {
        throw new BadRequestException(`El nuevo Profesor con ID ${updateCursoDto.profesorId} no fue encontrado.`);
      }
    }
    
    Object.assign(curso, updateCursoDto);
    return this.cursoRepository.save(curso);
  }

  async remove(id: number): Promise<{ mensaje: string }> {
    const result = await this.cursoRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado.`);
    }

    return { mensaje: `Curso con ID ${id} eliminado correctamente.` };
  }
}   
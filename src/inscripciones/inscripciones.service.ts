import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Inscripcion } from './entities/inscripcion.entity';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';

import { EstudiantesService } from '../estudiantes/estudiantes.service';
import { CursosService } from '../cursos/cursos.service'; 

@Injectable()
export class InscripcionesService {
  constructor(
    @InjectRepository(Inscripcion)
    private readonly inscripcionRepository: Repository<Inscripcion>,
    private readonly estudiantesService: EstudiantesService,
    private readonly cursosService: CursosService,
  ) {}

  async create(createInscripcionDto: CreateInscripcionDto): Promise<Inscripcion> {
    const { estudianteId, cursoId, nota } = createInscripcionDto;

    const estudianteExiste = await this.estudiantesService.findOne(estudianteId);
    if (!estudianteExiste) {
      throw new BadRequestException(`El Estudiante con ID ${estudianteId} no fue encontrado.`);
    }
    const cursoExiste = await this.cursosService.findOne(cursoId);
    if (!cursoExiste) {
      throw new BadRequestException(`El Curso con ID ${cursoId} no fue encontrado.`);
    }

    const inscripcionExistente = await this.inscripcionRepository.findOne({
      where: { 
            estudiante_id: estudianteId, 
            curso_id: cursoId,
        },
    });
    if (inscripcionExistente) {
      throw new BadRequestException(`El estudiante ID ${estudianteId} ya está inscrito en el curso ID ${cursoId}.`);
    }

    const nuevaInscripcion = this.inscripcionRepository.create({
      estudiante_id: estudianteId, 
      curso_id: cursoId,
      nota,
    });
    
    return this.inscripcionRepository.save(nuevaInscripcion);
  }

  async findAll(): Promise<Inscripcion[]> {
    return this.inscripcionRepository.find({ relations: ['estudiante', 'curso'] });
  }

  async findOne(id: number): Promise<Inscripcion> {
    const inscripcion = await this.inscripcionRepository.findOne({ 
      where: { id },
      relations: ['estudiante', 'curso'],
    });

    if (!inscripcion) {
      throw new NotFoundException(`Inscripción con ID ${id} no encontrada.`);
    }
    return inscripcion;
  }

  async update(id: number, updateInscripcionDto: UpdateInscripcionDto): Promise<Inscripcion> {
    const inscripcion = await this.inscripcionRepository.findOneBy({ id });
    if (!inscripcion) {
      throw new NotFoundException(`Inscripción con ID ${id} no encontrada.`);
    }
    
    Object.assign(inscripcion, updateInscripcionDto);
    return this.inscripcionRepository.save(inscripcion);
  }

  async remove(id: number): Promise<{ mensaje: string }> {
    const result = await this.inscripcionRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Inscripción con ID ${id} no encontrada.`);
    }
    
    return { mensaje: `Inscripción con ID ${id} eliminada correctamente.` };
  }
}
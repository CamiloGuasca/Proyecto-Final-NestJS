// src/cursos/cursos.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/nest generate controller cursos';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Post()
  async create(@Body() createCursoDto: CreateCursoDto): Promise<Curso> {
    return this.cursosService.create(createCursoDto);
  }

  @Get()
  async findAll(): Promise<Curso[]> {
    return this.cursosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Curso> {
    return this.cursosService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCursoDto: UpdateCursoDto,
  ): Promise<Curso> {
    return this.cursosService.update(id, updateCursoDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ mensaje: string }> {
    return this.cursosService.remove(id);
  }
}
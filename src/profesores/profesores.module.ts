import { Module } from '@nestjs/common';
import { ProfesoresService } from './profesores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Profesor]),
    ],
    providers: [ProfesoresService],
    exports: [ProfesoresService],
})
export class ProfesoresModule {}

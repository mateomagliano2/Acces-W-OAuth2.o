import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alumno } from './entities/alumno.entity';

@Injectable()
export class AlumnoService {
  constructor(
    @InjectRepository(Alumno)
    private alumnoRepo: Repository<Alumno>,
  ) {}

  findAll(): Promise<Alumno[]> {
    return this.alumnoRepo.find();
  }

  findOne(id: number): Promise<Alumno | null> {
    return this.alumnoRepo.findOneBy({ id });
  }

  async create(alumno: Partial<Alumno>): Promise<Alumno | null> {
    const existe = await this.alumnoRepo.findOneBy({ legajo: alumno.legajo });
    if (existe) {
      //return null;
      throw new ConflictException(`Ya existe un alumno con legajo ${alumno.legajo}`);
    }
    const nuevo = this.alumnoRepo.create(alumno);
    return this.alumnoRepo.save(nuevo);
  }

  async update(id: number, data: Partial<Alumno>): Promise<Alumno | null> {
    const existe = await this.alumnoRepo.findOneBy({ legajo: data.legajo});
    if (existe && existe.id != id) {
      throw new ConflictException(`Ya existe otro alumno con legajo ${data.legajo}`);
    }
    await this.alumnoRepo.update(id, data);
    return this.alumnoRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.alumnoRepo.delete(id);
  }
}

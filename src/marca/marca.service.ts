import { Injectable } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marca } from './entities/marca.entity';

@Injectable()
export class MarcaService {

  constructor(
    @InjectRepository(Marca) 
    private marcaRepository: Repository<Marca>,
  ) {}

  //Funcion crear marca
  async create(createMarcaDto: CreateMarcaDto): Promise<Marca> {
    const marca = this.marcaRepository.create(createMarcaDto);
    return await this.marcaRepository.save(marca);
  }

  findAll() {
    return `This action returns all marca`;
  }

  findOne(id: number) {
    return `This action returns a #${id} marca`;
  }

  update(id: number, updateMarcaDto: UpdateMarcaDto) {
    return `This action updates a #${id} marca`;
  }

  remove(id: number) {
    return `This action removes a #${id} marca`;
  }
}

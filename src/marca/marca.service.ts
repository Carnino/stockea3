import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(): Promise<Marca[]> {
    return await this.marcaRepository.find();
  }

  async findOne(id: number): Promise<Marca> {
    const marca = await this.marcaRepository.findOne({
      where: {
        id: id, 
      },
    });

    if(!marca){
      throw new NotFoundException(`La marca con ID ${id} no se encontró`);
    } 

    return marca;
  }

  async update(id: number, updateMarcaDto: UpdateMarcaDto): Promise<Marca> {
    const marca = await this.findOne(id)

    const updatedMarca = this.marcaRepository.merge(marca, updateMarcaDto);

    return await this.marcaRepository.save(updatedMarca);
  }

  async remove(id: number): Promise<void> {
    const result = await this.marcaRepository.delete(id);
    if (result.affected === 0) {
        throw new NotFoundException(`La marca con ID ${id} no se encontró`);
    }
  }
}

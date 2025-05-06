import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marca } from './entities/marca.entity';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';

@Injectable()
export class MarcasService {
  constructor(
    @InjectRepository(Marca)
    private readonly marcaRepository: Repository<Marca>,
  ) {}

  async create(createMarcaDto: CreateMarcaDto): Promise<Marca> {
    const marca = this.marcaRepository.create(createMarcaDto);
    return await this.marcaRepository.save(marca);
  }

  async findAll(): Promise<Marca[]> {
    return await this.marcaRepository.find({ withDeleted: false });
  }

  async findOne(id: number): Promise<Marca> {
    const marca = await this.marcaRepository.findOne({
      where: { id },
      withDeleted: false,
    });
    if (!marca) {
      throw new NotFoundException(`Marca con ID ${id} no encontrada`);
    }
    return marca;
  }

  async update(id: number, updateMarcaDto: UpdateMarcaDto): Promise<Marca> {
    const marca = await this.findOne(id);
    Object.assign(marca, updateMarcaDto);
    return await this.marcaRepository.save(marca);
  }

  async remove(id: number): Promise<void> {
    const marca = await this.findOne(id);
    await this.marcaRepository.softDelete(id);
  }
}
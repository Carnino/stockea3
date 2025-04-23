import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';


@Injectable()
export class CategoriasService {
  
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository : Repository<Categoria>
  ){}
  

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
      const Categoria = this.categoriaRepository.create(createCategoriaDto);
      return await this.categoriaRepository.save(Categoria);
    }

  async findAll() {
    return await this.categoriaRepository.find();
  }

  async findOne(id: number) {
      const categoria = await this.categoriaRepository.findOne({
        where: {
          id: id, 
        },
      });
  
      if(!categoria){
        throw new NotFoundException(`La categoria con ID ${id} no se encontró`);
      } 
  
      return categoria;
    }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoria`;
  }
}

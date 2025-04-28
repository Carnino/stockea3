import { Injectable, NotFoundException} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
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

  async findAll():Promise<Categoria[]> {
    return await this.categoriaRepository.find();
  }

  async findOne(id: number): Promise<Categoria> {
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

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.findOne(id)

    const updatedCategoria = this.categoriaRepository.merge(categoria, updateCategoriaDto);

    return await this.categoriaRepository.save(updatedCategoria);
  }

  async remove(id: number) : Promise<void> {
    const categoria = await this.findOne(id)

    const removeCategoria = this.categoriaRepository.remove(categoria)
  }

  async softDelete(id: number): Promise<void>{
    const result = await this.categoriaRepository.softDelete(id)

    if(result.affected === 0) {
      throw new NotFoundException(`La categoria con ID ${id} no se encontró`)
    }
  }

  async restore(id: number): Promise<void>{
    const result = await this.categoriaRepository.restore(id)

    if(result.affected === 0){
      throw new NotFoundException(`La categoria con ID ${id} no se encontró`)
    }
  }

  async findSoftDeleted(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({ 
      where:{
        deletedAt: Not(IsNull()), 
      },
      withDeleted: true 
    });
  }

}

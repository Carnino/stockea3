import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const producto = this.productoRepository.create(createProductoDto);
    return await this.productoRepository.save(producto);
  }

  async findAll(): Promise<Producto[]> {
    return await this.productoRepository.find({
      relations: ['categoria', 'marca'], // Especifica las relaciones a cargar
    });
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({ 
      relations: ['categoria', 'marca'],
      where: { 
        id:id
      } 
    });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findOne(id); 

    const updatedProducto =  this.productoRepository.merge(producto, updateProductoDto);

    try {
      return await this.productoRepository.save(updatedProducto);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23503') {
        throw new NotFoundException(
          'No se pudo actualizar el producto debido a un error con las claves foráneas proporcionadas. Verifica que los IDs de categoría y marca sean válidos.',
        );
      }
      // Si es otro error, lanza un Internal Server Error
      throw new HttpException('Error al actualizar el producto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  async remove(id: number): Promise<void> {
    const result = await this.productoRepository.delete(id)
    if(result.affected === 0){
      throw new NotFoundException(`El producto con ID ${id} no se encontró`);
    }
  }
}

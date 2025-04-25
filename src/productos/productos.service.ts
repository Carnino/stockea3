import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
      relations: ['categoria', 'marca','proveedor'],
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
    try {
    const producto = await this.findOne(id); 

    const updatedProducto =  this.productoRepository.merge(producto, updateProductoDto);

    return await this.productoRepository.save(updatedProducto);

    } catch (e) {
      // Loguear el error para depuración
      console.error('Error al actualizar el producto:', e);

      // Ejemplo de manejo de error de base de datos
      if (e instanceof QueryFailedError && e.driverError?.code === '23503') { // Código foreign_key_violation en PostgreSQL
        console.log(e)
        throw new ConflictException('Marca, categoria o proveedor no es correcta');
        
      }
      throw new InternalServerErrorException('Error interno al intentar actualizar el producto.');
    }
    
  }

  async remove(id: number): Promise<void> {
    const result = await this.productoRepository.delete(id)
    if(result.affected === 0){
      throw new NotFoundException(`El producto con ID ${id} no se encontró`);
    }
  }
}

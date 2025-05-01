import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, QueryFailedError, Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Marca } from 'src/marca/entities/marca.entity';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    // 1. Crea una instancia básica del producto con las propiedades directas
    const producto = this.productoRepository.create({
      nombre: createProductoDto.nombre,
      codigo: createProductoDto.codigo,
      descripcion: createProductoDto.descripcion,
      // NO incluyas 'categoria', 'marca', 'proveedor' aquí directamente
      // con los IDs del DTO.
    });

    // 2. Asigna las relaciones usando los IDs del DTO.
    // TypeORM entenderá que estos son los IDs de las entidades relacionadas
    if (createProductoDto.categoria) {
      producto.categoria = { id: createProductoDto.categoria as number } as Categoria;
    }
    if (createProductoDto.marca) {
      producto.marca = { id: createProductoDto.marca as number } as Marca;
    }
    if (createProductoDto.proveedor) {
      producto.proveedor = { id: createProductoDto.proveedor as number } as Proveedor;
    }

    // 3. Guarda el producto. TypeORM se encargará de las relaciones
    try {
      return await this.productoRepository.save(producto);
    } catch (e) {
      if (e instanceof QueryFailedError && e.driverError?.code === '23505') { 
        throw new ConflictException('El codigo del producto ya existe');
      }
      throw new InternalServerErrorException('Error interno al intentar actualizar el producto.');
    }  
  }

  async findAll(): Promise<Producto[]> {
    return await this.productoRepository.find({
      relations: ['categoria', 'marca','proveedor'], // Especifica las relaciones a cargar
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

  /* async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
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
    
  } */

  async remove(id: number): Promise<void> {
    const result = await this.productoRepository.delete(id)
    if(result.affected === 0){
      throw new NotFoundException(`El producto con ID ${id} no se encontró`);
    }
  }

  async softDelete(id: number): Promise<void> {
      const result = await this.productoRepository.softDelete(id)
  
      if(result.affected === 0){
        throw new NotFoundException(`El producto con ID ${id} no se encontró`)
      }
    }
  
    async restore(id: number): Promise<void>{
      const result = await this.productoRepository.restore(id)
  
      if(result.affected === 0){
        throw new NotFoundException(`El producto con ID ${id} no se encontró`)
      }
  
    }
  
    async findSoftDeleted(): Promise<Producto[]> {
      return await this.productoRepository.find({ 
        where:{
          deletedAt: Not(IsNull()), 
        },
        withDeleted: true 
      });
    }
}

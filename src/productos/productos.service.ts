import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const producto = this.productoRepository.create({
      ...createProductoDto,
      categoria: { id: createProductoDto.categoriaId },
      marca: { id: createProductoDto.marcaId },
      proveedor: { id: createProductoDto.proveedorId },
    });
    return await this.productoRepository.save(producto);
  }

  async findAll(): Promise<Producto[]> {
    return await this.productoRepository.find({
      withDeleted: false,
      relations: ['categoria', 'marca', 'proveedor'],
    });
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { id },
      withDeleted: false,
      relations: ['categoria', 'marca', 'proveedor'],
    });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findOne(id);
    if (updateProductoDto.categoriaId) {
      producto.categoria = { id: updateProductoDto.categoriaId } as any;
    }
    if (updateProductoDto.marcaId) {
      producto.marca = { id: updateProductoDto.marcaId } as any;
    }
    if (updateProductoDto.proveedorId) {
      producto.proveedor = { id: updateProductoDto.proveedorId } as any;
    }
    Object.assign(producto, {
      nombre: updateProductoDto.nombre,
      codigo: updateProductoDto.codigo,
      descripcion: updateProductoDto.descripcion,
    });
    return await this.productoRepository.save(producto);
  }

  async remove(id: number): Promise<void> {
    const producto = await this.findOne(id);
    await this.productoRepository.softDelete(id);
  }
}
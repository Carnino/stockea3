import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoEnStock } from './entities/productos-en-stock.entity';
import { CreateProductoEnStockDto } from './dto/create-productos-en-stock.dto';
import { UpdateProductoEnStockDto } from './dto/update-productos-en-stock.dto';

@Injectable()
export class ProductosEnStockService {
  constructor(
    @InjectRepository(ProductoEnStock)
    private readonly productoEnStockRepository: Repository<ProductoEnStock>,
  ) {}

  async create(createProductoEnStockDto: CreateProductoEnStockDto): Promise<ProductoEnStock> {
    const productoEnStock = this.productoEnStockRepository.create({
      ...createProductoEnStockDto,
      producto: { id: createProductoEnStockDto.productoId },
    });
    return await this.productoEnStockRepository.save(productoEnStock);
  }

  async findAllAvailable(search?: string): Promise<ProductoEnStock[]> {
    const query = this.productoEnStockRepository.createQueryBuilder('pes')
      .leftJoinAndSelect('pes.producto', 'producto')
      .where('pes.deletedAt IS NULL');

    if (search) {
      query.andWhere('producto.nombre ILIKE :search', { search: `%${search}%` });
    }

    return await query.getMany();
  }

  async findOne(id: number): Promise<ProductoEnStock> {
    const productoEnStock = await this.productoEnStockRepository.findOne({
      where: { id },
      withDeleted: false,
      relations: ['producto', 'movimientoSalida'],
    });
    if (!productoEnStock) {
      throw new NotFoundException(`Producto en stock con ID ${id} no encontrado`);
    }
    return productoEnStock;
  }

  async update(id: number, updateProductoEnStockDto: UpdateProductoEnStockDto): Promise<ProductoEnStock> {
    const productoEnStock = await this.findOne(id);
    if (updateProductoEnStockDto.productoId) {
      productoEnStock.producto = { id: updateProductoEnStockDto.productoId } as any;
    }
    if (updateProductoEnStockDto.movimientoSalidaId) {
      productoEnStock.movimientoSalida = { id: updateProductoEnStockDto.movimientoSalidaId } as any;
    }
    Object.assign(productoEnStock, {
      costo: updateProductoEnStockDto.costo,
      fechaAdquisicion: updateProductoEnStockDto.fechaAdquisicion ? new Date(updateProductoEnStockDto.fechaAdquisicion) : undefined,
      stock: updateProductoEnStockDto.stock,
    });
    return await this.productoEnStockRepository.save(productoEnStock);
  }

  async remove(id: number): Promise<void> {
    const productoEnStock = await this.findOne(id);
    await this.productoEnStockRepository.softDelete(id);
  }
}
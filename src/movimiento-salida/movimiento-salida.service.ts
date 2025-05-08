import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MovimientoSalida } from './entities/movimiento-salida.entity';
import { CreateMovimientoSalidaDto } from './dto/create-movimiento-salida.dto';
import { ProductoEnStock } from 'src/productos-en-stock/entities/productos-en-stock.entity';
import { UpdateMovimientoSalidaDto } from './dto/update-movimiento-salida.dto';

@Injectable()
export class MovimientosSalidaService {
  constructor(
    @InjectRepository(MovimientoSalida)
    private readonly movimientoSalidaRepository: Repository<MovimientoSalida>,
    @InjectRepository(ProductoEnStock)
    private readonly productoEnStockRepository: Repository<ProductoEnStock>,
  ) {}

  async create(createMovimientoSalidaDto: CreateMovimientoSalidaDto): Promise<MovimientoSalida> {
    const movimientoSalida = this.movimientoSalidaRepository.create({
      fechaHora: new Date(createMovimientoSalidaDto.fechaHora),
      total: createMovimientoSalidaDto.total,
    });

    const savedMovimientoSalida = await this.movimientoSalidaRepository.save(movimientoSalida);

    // Actualizar los productos en stock seleccionados
    const productoEnStockIds = createMovimientoSalidaDto.productoEnStockIds;
    const productosEnStock = await this.productoEnStockRepository.find({
      where: {
        id: In(productoEnStockIds),
      },
      withDeleted: false,
    });

    if (productosEnStock.length !== productoEnStockIds.length) {
      throw new NotFoundException('Algunos productos en stock no fueron encontrados');
    }

    // Asignar la relación y aplicar soft delete
    for (const productoEnStock of productosEnStock) {
      productoEnStock.movimientoSalida = savedMovimientoSalida;
      await this.productoEnStockRepository.softDelete(productoEnStock.id);
    }

    return savedMovimientoSalida;
  }

  async findAll(): Promise<MovimientoSalida[]> {
    return await this.movimientoSalidaRepository.find({ withDeleted: false });
  }

  async findOne(id: number): Promise<MovimientoSalida> {
    const movimientoSalida = await this.movimientoSalidaRepository.findOne({
      where: { id },
      withDeleted: false,
    });
    if (!movimientoSalida) {
      throw new NotFoundException(`Movimiento de salida con ID ${id} no encontrado`);
    }
    return movimientoSalida;
  }

  async update(id: number, updateMovimientoSalidaDto: UpdateMovimientoSalidaDto): Promise<MovimientoSalida> {
    const movimientoSalida = await this.findOne(id);
    Object.assign(movimientoSalida, updateMovimientoSalidaDto);
    return await this.movimientoSalidaRepository.save(movimientoSalida);
  }

  async remove(id: number): Promise<void> {
    const movimientoSalida = await this.findOne(id);
    await this.movimientoSalidaRepository.softDelete(id);
  }
}
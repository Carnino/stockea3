import { Injectable } from '@nestjs/common';
import { CreateProductosEnStockDto } from './dto/create-productos-en-stock.dto';
import { UpdateProductosEnStockDto } from './dto/update-productos-en-stock.dto';

@Injectable()
export class ProductosEnStockService {
  create(createProductosEnStockDto: CreateProductosEnStockDto) {
    return 'This action adds a new productosEnStock';
  }

  findAll() {
    return `This action returns all productosEnStock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productosEnStock`;
  }

  update(id: number, updateProductosEnStockDto: UpdateProductosEnStockDto) {
    return `This action updates a #${id} productosEnStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} productosEnStock`;
  }
}

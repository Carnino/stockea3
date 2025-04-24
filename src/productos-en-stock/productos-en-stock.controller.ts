import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductosEnStockService } from './productos-en-stock.service';
import { CreateProductosEnStockDto } from './dto/create-productos-en-stock.dto';
import { UpdateProductosEnStockDto } from './dto/update-productos-en-stock.dto';

@Controller('productos-en-stock')
export class ProductosEnStockController {
  constructor(private readonly productosEnStockService: ProductosEnStockService) {}

  @Post()
  create(@Body() createProductosEnStockDto: CreateProductosEnStockDto) {
    return this.productosEnStockService.create(createProductosEnStockDto);
  }

  @Get()
  findAll() {
    return this.productosEnStockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosEnStockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductosEnStockDto: UpdateProductosEnStockDto) {
    return this.productosEnStockService.update(+id, updateProductosEnStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosEnStockService.remove(+id);
  }
}

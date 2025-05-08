import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ProductosEnStockService } from './productos-en-stock.service';
import { CreateProductoEnStockDto } from './dto/create-productos-en-stock.dto';
import { UpdateProductoEnStockDto } from './dto/update-productos-en-stock.dto';

@Controller('productos-en-stock')
export class ProductosEnStockController {
  constructor(private readonly productosEnStockService: ProductosEnStockService) {}

  @Post()
  create(@Body() createProductoEnStockDto: CreateProductoEnStockDto) {
    return this.productosEnStockService.create(createProductoEnStockDto);
  }

  @Get()
  findAll(@Query('search') search?: string) {
    return this.productosEnStockService.findAllAvailable(search);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productosEnStockService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductoEnStockDto: UpdateProductoEnStockDto) {
    return this.productosEnStockService.update(id, updateProductoEnStockDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productosEnStockService.remove(id);
  }
}
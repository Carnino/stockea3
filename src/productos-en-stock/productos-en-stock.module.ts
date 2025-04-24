import { Module } from '@nestjs/common';
import { ProductosEnStockService } from './productos-en-stock.service';
import { ProductosEnStockController } from './productos-en-stock.controller';

@Module({
  controllers: [ProductosEnStockController],
  providers: [ProductosEnStockService],
})
export class ProductosEnStockModule {}

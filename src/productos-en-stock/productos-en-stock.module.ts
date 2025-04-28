import { Module } from '@nestjs/common';
import { ProductosEnStockService } from './productos-en-stock.service';
import { ProductosEnStockController } from './productos-en-stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosEnStock } from './entities/productos-en-stock.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([ProductosEnStock]),
    ],
  controllers: [ProductosEnStockController],
  providers: [ProductosEnStockService],
})
export class ProductosEnStockModule {}

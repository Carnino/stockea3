import { Module } from '@nestjs/common';
import { ProductosEnStockService } from './productos-en-stock.service';
import { ProductosEnStockController } from './productos-en-stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoEnStock } from './entities/productos-en-stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoEnStock])],
  controllers: [ProductosEnStockController],
  providers: [ProductosEnStockService],
  exports: [TypeOrmModule], // Exportar el TypeOrmModule para que otros módulos puedan usar el repositorio
})
export class ProductosEnStockModule {}

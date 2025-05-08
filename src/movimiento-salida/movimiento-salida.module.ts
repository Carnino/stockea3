import { Module } from '@nestjs/common';
import { MovimientosSalidaService } from './movimiento-salida.service';
import { MovimientosSalidaController } from './movimiento-salida.controller';
import { MovimientoSalida } from './entities/movimiento-salida.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosEnStockModule } from 'src/productos-en-stock/productos-en-stock.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovimientoSalida]),
    ProductosEnStockModule, // Importar el módulo para tener acceso al ProductoEnStockRepository
  ],
  controllers: [MovimientosSalidaController],
  providers: [MovimientosSalidaService],
})
export class MovimientoSalidaModule {}
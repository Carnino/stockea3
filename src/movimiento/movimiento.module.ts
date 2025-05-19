import { Module } from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { MovimientoController } from './movimiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimiento } from './entities/movimiento.entity';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movimiento]),
    ProductosModule,
  ],
  controllers: [MovimientoController],
  providers: [MovimientoService],
})
export class MovimientoModule {}

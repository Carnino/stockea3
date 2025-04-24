import { Module } from '@nestjs/common';
import { MovimientoSalidaService } from './movimiento-salida.service';
import { MovimientoSalidaController } from './movimiento-salida.controller';
import { MovimientoSalida } from './entities/movimiento-salida.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forFeature([MovimientoSalida]),
    ],
  controllers: [MovimientoSalidaController],
  providers: [MovimientoSalidaService],
})
export class MovimientoSalidaModule {}

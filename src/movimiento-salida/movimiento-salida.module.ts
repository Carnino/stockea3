import { Module } from '@nestjs/common';
import { MovimientoSalidaService } from './movimiento-salida.service';
import { MovimientoSalidaController } from './movimiento-salida.controller';

@Module({
  controllers: [MovimientoSalidaController],
  providers: [MovimientoSalidaService],
})
export class MovimientoSalidaModule {}

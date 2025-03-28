import { Module } from '@nestjs/common';
import { DetallesMovimientoService } from './detalles-movimiento.service';
import { DetallesMovimientoController } from './detalles-movimiento.controller';

@Module({
  controllers: [DetallesMovimientoController],
  providers: [DetallesMovimientoService],
})
export class DetallesMovimientoModule {}

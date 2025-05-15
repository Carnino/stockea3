import { Module } from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { MovimientoController } from './movimiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimiento } from './entities/movimiento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movimiento]),
  ],
  controllers: [MovimientoController],
  providers: [MovimientoService],
})
export class MovimientoModule {}

import { Injectable } from '@nestjs/common';
import { CreateMovimientoSalidaDto } from './dto/create-movimiento-salida.dto';
import { UpdateMovimientoSalidaDto } from './dto/update-movimiento-salida.dto';

@Injectable()
export class MovimientoSalidaService {
  create(createMovimientoSalidaDto: CreateMovimientoSalidaDto) {
    return 'This action adds a new movimientoSalida';
  }

  findAll() {
    return `This action returns all movimientoSalida`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movimientoSalida`;
  }

  update(id: number, updateMovimientoSalidaDto: UpdateMovimientoSalidaDto) {
    return `This action updates a #${id} movimientoSalida`;
  }

  remove(id: number) {
    return `This action removes a #${id} movimientoSalida`;
  }
}

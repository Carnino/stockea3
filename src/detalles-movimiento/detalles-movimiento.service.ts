import { Injectable } from '@nestjs/common';
import { CreateDetallesMovimientoDto } from './dto/create-detalles-movimiento.dto';
import { UpdateDetallesMovimientoDto } from './dto/update-detalles-movimiento.dto';

@Injectable()
export class DetallesMovimientoService {
  create(createDetallesMovimientoDto: CreateDetallesMovimientoDto) {
    return 'This action adds a new detallesMovimiento';
  }

  findAll() {
    return `This action returns all detallesMovimiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detallesMovimiento`;
  }

  update(id: number, updateDetallesMovimientoDto: UpdateDetallesMovimientoDto) {
    return `This action updates a #${id} detallesMovimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} detallesMovimiento`;
  }
}

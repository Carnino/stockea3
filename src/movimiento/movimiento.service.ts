import { Injectable } from '@nestjs/common';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movimiento } from './entities/movimiento.entity';

@Injectable()
export class MovimientoService {
  constructor(
    @InjectRepository(Movimiento)
    private movimientoRepository: Repository<Movimiento>,
  ){}

  async create(createMovimientoDto: CreateMovimientoDto):Promise<Movimiento> {
    const movimiento = this.movimientoRepository.create(createMovimientoDto)
    return await this.movimientoRepository.save(movimiento)
  }

  async findAll():Promise<Movimiento[]> {
    return await this.movimientoRepository.find({
      relations: ['producto'],
    })
  }

  /* findOne(id: number) {
    return `This action returns a #${id} movimiento`;
  } */

  //VERRRRR
  update(id: number, updateMovimientoDto: UpdateMovimientoDto) {
    return `This action updates a #${id} movimiento`;
  }

  //NO DEBERIA PODER BORRAR LOS MOVIMIENTOS
  /* remove(id: number) {
    return `This action removes a #${id} movimiento`;
  } */
}

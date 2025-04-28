import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovimientoSalidaDto } from './dto/create-movimiento-salida.dto';
import { UpdateMovimientoSalidaDto } from './dto/update-movimiento-salida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovimientoSalida } from './entities/movimiento-salida.entity';
import { IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class MovimientoSalidaService {

 constructor(
    @InjectRepository(MovimientoSalida)
    private movimeintoSalidaRepository : Repository<MovimientoSalida>
  ){}

  async create(createMovimientoSalidaDto: CreateMovimientoSalidaDto) : Promise<MovimientoSalida> {
    const movSalida = this.movimeintoSalidaRepository.create(createMovimientoSalidaDto)
    return await this.movimeintoSalidaRepository.save(movSalida)
  }

  async findAll() : Promise<MovimientoSalida[]> {
    return await this.movimeintoSalidaRepository.find()
  }

  async findOne(id: number) : Promise<MovimientoSalida> {
    const movSalida = await this.movimeintoSalidaRepository.findOne({
            where: {
              id: id, 
            },
          });
      
          if(!movSalida){
            throw new NotFoundException(`El moviendo de salida con ID ${id} no se encontró`);
          } 
      
          return movSalida;
  }

  async update(id: number, updateMovimientoSalidaDto: UpdateMovimientoSalidaDto) : Promise<MovimientoSalida>  {
    const movSalida = await this.findOne(id)

    const movSalidaUpdate = this.movimeintoSalidaRepository.merge(movSalida, updateMovimientoSalidaDto)
    return this.movimeintoSalidaRepository.save(updateMovimientoSalidaDto)
  }

  async remove(id: number) : Promise<void>{
    const movSalida = await this.findOne(id)

    const removeCategoria = this.movimeintoSalidaRepository.remove(movSalida)
  }
  async softDelete(id: number) : Promise<void>{
    const result =  await this.movimeintoSalidaRepository.softDelete(id)
    if(result.affected === 0){
      throw new NotFoundException(`El moviendo de salida con ID ${id} no se encontró`)
    }
  }

  async restore(id:number) : Promise<void>{
    const result = await this.movimeintoSalidaRepository.restore(id)
    if(result.affected === 0){
      throw new NotFoundException(`El moviendo de salida con ID ${id} no se encontró`)
    }
  }

  async findSoftDeleted() : Promise<MovimientoSalida[]>{
    return await this.movimeintoSalidaRepository.find({
      where: {
        deletedAt: Not(IsNull()),
      },
      withDeleted: true
    })
  }
}

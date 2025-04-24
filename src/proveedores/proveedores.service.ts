import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedores } from './entities/proveedores.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProveedoresService {

  constructor(
      @InjectRepository(Proveedores)
      private proveedoresRepository : Repository<Proveedores>
    ){}

  async create(createProveedoreDto: CreateProveedoreDto) : Promise<Proveedores> {
    const provedores = this.proveedoresRepository.create(createProveedoreDto)
    return await this.proveedoresRepository.save(provedores)
  }

  async findAll() : Promise<Proveedores[]> {
        return await this.proveedoresRepository.find();
      }

  async findOne(id: number): Promise<Proveedores> {
    const proveedores = await this.proveedoresRepository.findOne({
      where: {
        id: id,
      },
    });

    if(!proveedores){
      throw new NotFoundException (`El Proveedor con ID ${id} no se encontró`);
    }

    return proveedores
  }

  async update(id: number, updateProveedoreDto: UpdateProveedoreDto):Promise<Proveedores> {
    const proveedores = await this.findOne(id)

    const upadteProveedores = this.proveedoresRepository.merge(proveedores,updateProveedoreDto) 
    return await this.proveedoresRepository.save(upadteProveedores);
  }

  async remove(id: number): Promise<void>{
    const result = await this.proveedoresRepository.delete(id);
    if (result.affected === 0) {
        throw new NotFoundException(`El Proveedor con ID ${id} no se encontró`);
    }
  }
}

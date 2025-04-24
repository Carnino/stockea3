import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedor} from './entities/proveedor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProveedorService {

  constructor(
      @InjectRepository(Proveedor)
      private proveedorRepository : Repository<Proveedor>
    ){}

  async create(createProveedorDto: CreateProveedorDto) : Promise<Proveedor> {
    const provedores = this.proveedorRepository.create(createProveedorDto)
    return await this.proveedorRepository.save(provedores)
  }

  async findAll() : Promise<Proveedor[]> {
        return await this.proveedorRepository.find();
      }

  async findOne(id: number): Promise<Proveedor> {
    const proveedores = await this.proveedorRepository.findOne({
      where: {
        id: id,
      },
    });

    if(!proveedores){
      throw new NotFoundException (`El Proveedor con ID ${id} no se encontró`);
    }

    return proveedores
  }

  async update(id: number, updateProveedorDto: UpdateProveedorDto):Promise<Proveedor> {
    const proveedores = await this.findOne(id)

    const upadteProveedores = this.proveedorRepository.merge(proveedores,updateProveedorDto) 
    return await this.proveedorRepository.save(upadteProveedores);
  }

  async remove(id: number): Promise<void>{
    const result = await this.proveedorRepository.delete(id);
    if (result.affected === 0) {
        throw new NotFoundException(`El Proveedor con ID ${id} no se encontró`);
    }
  }
}

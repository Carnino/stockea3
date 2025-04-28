import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductosEnStockDto } from './dto/create-productos-en-stock.dto';
import { UpdateProductosEnStockDto } from './dto/update-productos-en-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductosEnStock } from './entities/productos-en-stock.entity';
import { IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class ProductosEnStockService {
  
  constructor(
    @InjectRepository(ProductosEnStock)
    private productosEnStockRepository : Repository<ProductosEnStock>
  ){}
  
    async create(createProveedorDto: CreateProductosEnStockDto) : Promise<ProductosEnStock> {
      const provedores = this.productosEnStockRepository.create(createProveedorDto)
      return await this.productosEnStockRepository.save(provedores)
    }
  
    async findAll() : Promise<ProductosEnStock[]> {
          return await this.productosEnStockRepository.find();
        }
  
    async findOne(id: number): Promise<ProductosEnStock> {
      const proveedores = await this.productosEnStockRepository.findOne({
        where: {
          id: id,
        },
      });
  
      if(!proveedores){
        throw new NotFoundException (`El Producto En Stock con ID ${id} no se encontró`);
      }
  
      return proveedores
    }
  
    async update(id: number, updateProdcutoEnStockDto: UpdateProductosEnStockDto):Promise<ProductosEnStock> {
      const proveedores = await this.findOne(id)
  
      const upadteProveedores = this.productosEnStockRepository.merge(proveedores,updateProdcutoEnStockDto) 
      return await this.productosEnStockRepository.save(upadteProveedores);
    }
  
    async remove(id: number): Promise<void>{
      const result = await this.productosEnStockRepository.delete(id);
      if (result.affected === 0) {
          throw new NotFoundException(`El Producto en Stock con ID ${id} no se encontró`);
      }
    }
  
    async softDelete(id : number): Promise<void>{
      const result = await this.productosEnStockRepository.softDelete(id)
  
      if(result.affected === 0){
        throw new NotFoundException(`El Producto En Stock con ID ${id} no se encontró`)
      }
    }
  
    async restore(id : number) : Promise<void>{
      const result = await this.productosEnStockRepository.restore(id)
      if(result.affected === 0){
        throw new NotFoundException(`El Producto en Stock con ID ${id} no se encontró`)
      }
    }
  
    async findSoftDeleted() : Promise<ProductosEnStock[]>{
      return await this.productosEnStockRepository.find({
            where: {
              deletedAt: Not(IsNull()),
            },
            withDeleted: true
          })
        }
}

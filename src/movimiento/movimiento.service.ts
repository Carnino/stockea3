  import { Injectable, InternalServerErrorException } from '@nestjs/common';
  import { CreateMovimientoDto } from './dto/create-movimiento.dto';
  import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Movimiento } from './entities/movimiento.entity';
  import { ProductosService } from 'src/productos/productos.service';
import { Producto } from 'src/productos/entities/producto.entity';
  @Injectable()
  export class MovimientoService {
    constructor(
      @InjectRepository(Movimiento)
      private movimientoRepository: Repository<Movimiento>,
      private readonly productoService: ProductosService
    ){}


    async create(createMovimientoDto: CreateMovimientoDto):Promise<Movimiento> {

      //1. Crea una instacia basica el movimiento con las propiedades directas 
      const movimiento = this.movimientoRepository.create({
        nombre: createMovimientoDto.nombre,
        costo: createMovimientoDto.costo,
        cantidad: createMovimientoDto.cantidad,
        tipoMovimiento: createMovimientoDto.tipoMovimiento
      })

      //Asigna las relaciones usando los IDs del DTO
      //TypeORM entendera que estos son los IDs de las entidades relacionadas
      if(createMovimientoDto.producto){
        movimiento.producto = {id: createMovimientoDto.producto as number} as Producto
      }
      
      //Obtengo datos que me van a servir para actualizar stock
      const idProducto = (movimiento.producto as Producto).id;
      const ingresoStock = movimiento.cantidad
      const tipoMovimiento = movimiento.tipoMovimiento
      const costoMovimiento = movimiento.costo

      //ActualizoStock
      await this.productoService.updateStock({ id: idProducto, stock: ingresoStock, tipoMovimiento: tipoMovimiento, costoMovimiento:costoMovimiento});

      //Guardar el movimiento. TypeORM se encargara de las relaciones
    
      try {
        return await this.movimientoRepository.save(movimiento)
      } catch (e) {
        throw new InternalServerErrorException('Error interno al intentar actualizar el producto.');
      }
    }

    async findAll():Promise<Movimiento[]> {
      return await this.movimientoRepository.find({
        relations: ['producto', 'producto.proveedor', 'producto.categoria'],
        loadEagerRelations: false, // Importante para evitar duplicados si tienes EAGER en las entidades
        join: {
          alias: 'movimiento',
          leftJoinAndSelect: {
            producto: 'movimiento.producto',
          },
    },
    where: {}, // Puedes agregar otras condiciones aquí si es necesario
    withDeleted: true, // Esto aplicaría a la entidad movimiento en sí, si también tiene soft delete
    relationLoadStrategy: 'query', // Recomendado para mejor rendimiento en casos con muchas relaciones
      });
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

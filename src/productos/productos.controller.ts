import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@Controller('producto')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  create(@Body() createProductoDto: CreateProductoDto): Promise<Producto> {
    try {
      return this.productosService.create(createProductoDto);
    } catch (e) {
      console.error('Error al crear el producto:', e)
      throw new HttpException(
        'Ocurrió un error al crear el producto',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
}
  }

  @Get()
  findAll(): Promise<Producto[]> {
    try {
      return this.productosService.findAll();
    } catch (e) {
      console.error('Error al buscar los productos:', e)
      throw new HttpException(
        'Ocurrió un error al buscar los productos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Get('/findOne/:id')
  findOne(@Param('id',ParseIntPipe) id: number): Promise<Producto> {
    try {
      return this.productosService.findOne(id);
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e; // Re-lanza la excepción para que NestJS la maneje
      }
      console.error('Error al buscar el producto:', e);
      throw new HttpException(
          'Ocurrió un error al buscar el producto',
          HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  // Por el momento no se usa. En caso de usarlo hay que arreglar la parte de modificar una foreign key
   @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductoDto: UpdateProductoDto): Promise<Producto>{
    try {
      return this.productosService.update(id, updateProductoDto);
    } catch (e) {
      if (e instanceof NotFoundException){
        throw e
      }else{
        console.error('Error al actualizar el producto:', e)
        throw new HttpException(
          'Ocurrió un error al actualizar el producto',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
      }
    }
  } 

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number):Promise<void> {
    try {
      return this.productosService.remove(id);
    } catch (e) {
      if (e instanceof NotFoundException){
        throw e
      }
      console.error('Error al eliminar el producto:', e)
      throw new HttpException(
        'Ocurrió un error al eliminar el producto',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Delete('/softDelete/:id')
  async softDelete(@Param('id', ParseIntPipe) id: number): Promise<void>{
    try {
      await this.productosService.softDelete(id)
    } catch (e) {
      if (e instanceof NotFoundException){
        throw e
      }
      console.error('Error al eliminar el producto:', e)
      throw new HttpException(
        'Ocurrió un error al eliminar el producto',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Patch('/restore/:id')
  async restore(@Param('id', ParseIntPipe) id: number): Promise<void>{
    try {
      await this.productosService.restore(id)
    } catch (e) {
      if (e instanceof NotFoundException){
        throw e
      }
      console.error('Error al restaurar el producto:', e)
      throw new HttpException(
        'Ocurrió un error al restaurar el producto',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
    
  }

  @Get('/findSoftDeleted')
  async findSoftDeleted():Promise<Producto[]>{
    try {
      return this.productosService.findSoftDeleted();
    } catch (e) {
      console.error('Error al buscar los productos:', e)
        throw new HttpException(
          'Ocurrió un error al buscar los productos',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
    }
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { Proveedores } from './entities/proveedores.entity';
import { NotFoundError } from 'rxjs';

@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Post()
  create(@Body() createProveedoreDto: CreateProveedoreDto): Promise<Proveedores> {
   try {
         return this.proveedoresService.create(createProveedoreDto);
       } catch (e) {
         console.error('Error al crear el Proveedor:', e)
           throw new HttpException(
             'Ocurrió un error al crear el  Proveedor',
             HttpStatus.INTERNAL_SERVER_ERROR,
           )
       }
      }

  @Get()
  findAll(){
    try {
      return this.proveedoresService.findAll();
    } catch (e) {
      console.error('Error al buscar los Proveedores:', e)
        throw new HttpException(
          'Ocurrió un error al buscar los Proveedores',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) : Promise<Proveedores> {
     try {
      return await this.proveedoresService.findOne(id);
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e; // Re-lanza la excepción para que NestJS la maneje
              }
              console.error('Error al buscar el Proveedor:', e);
                throw new HttpException(
                    'Ocurrió un error al buscar el Proveedor',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }

  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProveedoreDto: UpdateProveedoreDto): Promise<Proveedores> {
    try {
      return this.proveedoresService.update(id, updateProveedoreDto);
    } catch (e) {
      if (e instanceof NotFoundError){
        throw e
      }else{
        console.error('Error al actualizar el Proveedor:', e)
        throw new HttpException(
          'Ocurrió un error al actualizar el proveedor',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) : Promise<void> {
    try {
      await this.proveedoresService.remove(id);
    } catch (e) {
      if(e instanceof NotFoundException){
        throw e;
      }
      console.error('Error al eliminar el Proveedor:', e)
        throw new HttpException(
          'Ocurrió un error al eliminar el Proveedor',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
    }
  }
}

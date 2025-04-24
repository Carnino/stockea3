import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import {Proveedor} from './entities/proveedor.entity';
import { NotFoundError } from 'rxjs';

@Controller('proveedor')
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  @Post()
  create(@Body() createProveedorDto: CreateProveedorDto): Promise<Proveedor> {
   try {
         return this.proveedorService.create(createProveedorDto);
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
      return this.proveedorService.findAll();
    } catch (e) {
      console.error('Error al buscar los Proveedores:', e)
        throw new HttpException(
          'Ocurrió un error al buscar los Proveedores',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) : Promise<Proveedor> {
     try {
      return await this.proveedorService.findOne(id);
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
  update(@Param('id') id: number, @Body() updateProveedorDto: UpdateProveedorDto): Promise<Proveedor> {
    try {
      return this.proveedorService.update(id, updateProveedorDto);
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
      await this.proveedorService.remove(id);
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

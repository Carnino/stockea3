import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { MovimientoSalidaService } from './movimiento-salida.service';
import { CreateMovimientoSalidaDto } from './dto/create-movimiento-salida.dto';
import { UpdateMovimientoSalidaDto } from './dto/update-movimiento-salida.dto';
import { MovimientoSalida } from './entities/movimiento-salida.entity';
import { NotFoundError } from 'rxjs';

@Controller('movimiento-salida')
export class MovimientoSalidaController {
  constructor(private readonly movimientoSalidaService: MovimientoSalidaService) {}

  @Post()
  create(@Body() createMovimientoSalidaDto: CreateMovimientoSalidaDto) : Promise<MovimientoSalida> {
    try {
          return this.movimientoSalidaService.create(createMovimientoSalidaDto);
        } catch (e) {
          console.error('Error al crear el movimiento de salida:', e)
            throw new HttpException(
              'Ocurrió un error al crear el movimiento de salida',
              HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
  }

  @Get()
  findAll(): Promise<MovimientoSalida[]> {
    try {
      return this.movimientoSalidaService.findAll();
    } catch (e) {
      console.error('Error al buscar los movimientos de salida:', e)
        throw new HttpException(
          'Ocurrió un error al buscar los movimientos de salida',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) : Promise<MovimientoSalida> {
    try {
              return await this.movimientoSalidaService.findOne(id);
            } catch (e) {
              if (e instanceof NotFoundException) {
                throw e; // Re-lanza la excepción para que NestJS la maneje
              }
              console.error('Error al buscar el movimiento de salida:', e);
                throw new HttpException(
                    'Ocurrió un error al buscar el movimiento de salida',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMovimientoSalidaDto: UpdateMovimientoSalidaDto) : Promise<MovimientoSalida> {
     try {
          return this.movimientoSalidaService.update(id, updateMovimientoSalidaDto);
        } catch (e) {
          if (e instanceof NotFoundError){
            throw e
          }else{
            console.error('Error al actualizar el movimiento de salida:', e)
            throw new HttpException(
              'Ocurrió un error al actualizar el movimiento de salida',
              HttpStatus.INTERNAL_SERVER_ERROR,
            )
          }
        }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) : Promise<void> {
    try {
      await this.movimientoSalidaService.remove(id);
    } catch (e) {
      if (e instanceof NotFoundException){
        throw e
      }
      console.error('Error al eliminar el movimiento de salida:', e)
        throw new HttpException(
          'Ocurrió un error al eliminar el movimiento de salida',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
    }
  }
}

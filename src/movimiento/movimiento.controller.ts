import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
import { Movimiento } from './entities/movimiento.entity';

@Controller('movimiento')
export class MovimientoController {
  constructor(private readonly movimientoService: MovimientoService) {}

  @Post()
  async create(@Body() createMovimientoDto: CreateMovimientoDto): Promise<Movimiento> {
    try {
      return this.movimientoService.create(createMovimientoDto);
    } catch (e) {
      console.error('Error al crear el movimiento:', e)
      throw new HttpException(
        'Ocurrió un error al crear el movimiento',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Get()
  findAll():Promise<Movimiento[]> {
    try {
      return this.movimientoService.findAll();
    } catch (e) {
      console.error('Error al buscar los movimientos:', e)
      throw new HttpException(
        'Ocurrió un error al buscar los movimientos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  /* @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovimientoDto: UpdateMovimientoDto) {
    return this.movimientoService.update(+id, updateMovimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimientoService.remove(+id);
  } */
}

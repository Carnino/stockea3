import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MovimientosSalidaService } from './movimiento-salida.service';
import { CreateMovimientoSalidaDto } from './dto/create-movimiento-salida.dto';
import { UpdateMovimientoSalidaDto } from './dto/update-movimiento-salida.dto';

@Controller('movimientos-salida')
export class MovimientosSalidaController {
  constructor(private readonly movimientosSalidaService: MovimientosSalidaService) {}

  @Post()
  create(@Body() createMovimientoSalidaDto: CreateMovimientoSalidaDto) {
    return this.movimientosSalidaService.create(createMovimientoSalidaDto);
  }

  @Get()
  findAll() {
    return this.movimientosSalidaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.movimientosSalidaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMovimientoSalidaDto: UpdateMovimientoSalidaDto) {
    return this.movimientosSalidaService.update(id, updateMovimientoSalidaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.movimientosSalidaService.remove(id);
  }
}
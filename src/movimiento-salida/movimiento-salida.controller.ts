import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovimientoSalidaService } from './movimiento-salida.service';
import { CreateMovimientoSalidaDto } from './dto/create-movimiento-salida.dto';
import { UpdateMovimientoSalidaDto } from './dto/update-movimiento-salida.dto';

@Controller('movimiento-salida')
export class MovimientoSalidaController {
  constructor(private readonly movimientoSalidaService: MovimientoSalidaService) {}

  @Post()
  create(@Body() createMovimientoSalidaDto: CreateMovimientoSalidaDto) {
    return this.movimientoSalidaService.create(createMovimientoSalidaDto);
  }

  @Get()
  findAll() {
    return this.movimientoSalidaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimientoSalidaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovimientoSalidaDto: UpdateMovimientoSalidaDto) {
    return this.movimientoSalidaService.update(+id, updateMovimientoSalidaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimientoSalidaService.remove(+id);
  }
}

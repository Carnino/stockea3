import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetallesMovimientoService } from './detalles-movimiento.service';
import { CreateDetallesMovimientoDto } from './dto/create-detalles-movimiento.dto';
import { UpdateDetallesMovimientoDto } from './dto/update-detalles-movimiento.dto';

@Controller('detalles-movimiento')
export class DetallesMovimientoController {
  constructor(private readonly detallesMovimientoService: DetallesMovimientoService) {}

  @Post()
  create(@Body() createDetallesMovimientoDto: CreateDetallesMovimientoDto) {
    return this.detallesMovimientoService.create(createDetallesMovimientoDto);
  }

  @Get()
  findAll() {
    return this.detallesMovimientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detallesMovimientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetallesMovimientoDto: UpdateDetallesMovimientoDto) {
    return this.detallesMovimientoService.update(+id, updateDetallesMovimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detallesMovimientoService.remove(+id);
  }
}

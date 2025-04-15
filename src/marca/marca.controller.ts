import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';

@Controller('Marcas')
export class MarcaController {
  constructor(private readonly MarcaService: MarcaService) {}

  @Post()
  create(@Body() createMarcaDto: CreateMarcaDto) {
    return this.MarcaService.create(createMarcaDto);
  }

  @Get()
  findAll() {
    return this.MarcaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.MarcaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarcaDto: UpdateMarcaDto) {
    return this.MarcaService.update(+id, updateMarcaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.MarcaService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { Marca } from './entities/marca.entity';

@Controller('marca')
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
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Marca> {
    try {
      return await this.MarcaService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-lanza la excepción para que NestJS la maneje
      }
      // Manejar otros posibles errores aquí
      throw new Error('Ocurrió un error al buscar la marca');
    }
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

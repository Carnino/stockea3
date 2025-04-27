import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { Marca } from './entities/marca.entity';

@Controller('marca')
export class MarcaController {
  constructor(private readonly MarcaService: MarcaService) {}

  @Post()
  create(@Body() createMarcaDto: CreateMarcaDto): Promise<Marca> {
    //Este try catch es basico se puede mejorar para llaves unicas por ejemplo
    try {
      return this.MarcaService.create(createMarcaDto);
    } catch (e) {
      console.error('Error al crear la marca:', e)
        throw new HttpException(
          'Ocurrió un error al crear la marca',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
    }
  }

  @Get()
  findAll():Promise<Marca[]> {
    //Este try catch es basico se puede mejorar para llaves unicas por ejemplo
    try {
      return this.MarcaService.findAll();
    } catch (e) {
      console.error('Error al buscar las marcas:', e)
        throw new HttpException(
          'Ocurrió un error al buscar las marcas',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
    }
  }


  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Marca> {
    try {
      return await this.MarcaService.findOne(id);
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e; // Re-lanza la excepción para que NestJS la maneje
      }
      console.error('Error al buscar la marca:', e);
        throw new HttpException(
            'Ocurrió un error al buscar la marca',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateMarcaDto: UpdateMarcaDto): Promise<Marca>{
    try {
      return await this.MarcaService.update(id, updateMarcaDto);
    } catch (e) {
      if (e instanceof NotFoundException){
        throw e
      }else{
        console.error('Error al actualizar la marca:', e)
        throw new HttpException(
          'Ocurrió un error al actualizar la marca',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.MarcaService.remove(id);
    } catch (e) {
      if (e instanceof NotFoundException){
        throw e
      }
      console.error('Error al eliminar la marca:', e)
        throw new HttpException(
          'Ocurrió un error al eliminar la marca',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
    }
    
  }

  @Delete('/softDelete/:id')
  async softDelete(@Param('id', ParseIntPipe) id: number): Promise<void>{
    try {
      await this.MarcaService.softDelete(id)
    } catch (e) {
      if (e instanceof NotFoundException){
        throw e
      }
      console.error('Error al eliminar la marca:', e)
      throw new HttpException(
        'Ocurrió un error al eliminar la marca',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Patch('/restore/:id')
  async restore(@Param('id', ParseIntPipe) id: number): Promise<void>{
    try {
      await this.MarcaService.restore(id)
    } catch (e) {
      if (e instanceof NotFoundException){
        throw e
      }
      console.error('Error al restaurar la marca:', e)
      throw new HttpException(
        'Ocurrió un error al restaurar la marca',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
    
  }

  @Get('/findSoftDeleted')
  async findSoftDeleted():Promise<Marca[]>{
    try {
      return this.MarcaService.findSoftDeleted();
    } catch (e) {
      console.error('Error al buscar las marcas:', e)
        throw new HttpException(
          'Ocurrió un error al buscar las marcas',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
    }
  }


}

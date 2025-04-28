import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { NotFoundError } from 'rxjs';

@Controller('categoria')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) : Promise<Categoria> {
    try {
      return this.categoriasService.create(createCategoriaDto);
    } catch (e) {
      console.error('Error al crear la Categoria:', e)
        throw new HttpException(
          'Ocurrió un error al crear la Categoria',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
    }
  }

  @Get()
  findAll() {
    try {
      return this.categoriasService.findAll();
    } catch (e) {
      console.error('Error al buscar las categorias:', e)
        throw new HttpException(
          'Ocurrió un error al buscar las categorias',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
    }
  }

  @Get('/findOne/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
    try {
          return await this.categoriasService.findOne(id);
        } catch (e) {
          if (e instanceof NotFoundException) {
            throw e; // Re-lanza la excepción para que NestJS la maneje
          }
          console.error('Error al buscar la Categoria:', e);
            throw new HttpException(
                'Ocurrió un error al buscar la Categoria',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria>{
    try {
      return this.categoriasService.update(id, updateCategoriaDto);
    } catch (e) {
      if (e instanceof NotFoundError){
        throw e
      }else{
        console.error('Error al actualizar la Categoria:', e)
        throw new HttpException(
          'Ocurrió un error al actualizar la Categoria',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void>  {
    try {
      await this.categoriasService.remove(id);
    } catch (e) {
      if (e instanceof NotFoundException){
        throw e
      }
      console.error('Error al eliminar la categoria:', e)
        throw new HttpException(
          'Ocurrió un error al eliminar la categoria',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
    }
  }

  @Delete('/softDelete/:id')
  async softDelete(@Param('id', ParseIntPipe) id: number): Promise<void>{
    try {
      await this.categoriasService.softDelete(id)
    } catch (e) {
      if (e instanceof NotFoundException){
        throw e
      }
      console.error('Error al eliminar la categoria:', e)
      throw new HttpException(
        'Ocurrió un error al eliminar la categoria',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Patch('/restore/:id')
  async restore(@Param('id', ParseIntPipe) id: number): Promise<void>{
    try {
      await this.categoriasService.restore(id)
    } catch (e) {
      if (e instanceof NotFoundException){
        throw e
      }
      console.error('Error al restaurar la categoria:', e)
      throw new HttpException(
        'Ocurrió un error al restaurar la categoria',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Get('/findSoftDeleted')
  async findSoftDeleted():Promise<Categoria[]>{
    try {
      return this.categoriasService.findSoftDeleted();
    } catch (e) {
      console.error('Error al buscar las categorias:', e)
        throw new HttpException(
          'Ocurrió un error al buscar las categorias',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
    }
  }
}

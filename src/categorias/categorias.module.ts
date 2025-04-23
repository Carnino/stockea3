import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasController } from './categorias.controller';
import { Categoria } from './entities/categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categoria]),
  ],
  controllers: [CategoriasController],
  providers: [CategoriasService],
  imports: [
      TypeOrmModule.forFeature([Categoria]),
    ],
})
export class CategoriasModule {}

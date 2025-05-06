import { Module } from '@nestjs/common';
import { MarcasService } from './marca.service';
import { MarcasController } from './marca.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marca } from './entities/marca.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Marca]),
  ],
  controllers: [MarcasController],
  providers: [MarcasService],
  })
export class MarcaModule {}

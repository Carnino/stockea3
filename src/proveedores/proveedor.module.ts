import { Module } from '@nestjs/common';
import { ProveedoresService } from './proveedor.service';
import { ProveedoresController } from './proveedor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from './entities/proveedor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proveedor]),
  ],
  controllers: [ProveedoresController],
  providers: [ProveedoresService],
})
export class ProveedorModule {}


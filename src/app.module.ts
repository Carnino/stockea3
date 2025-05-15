import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { ProveedorModule } from './proveedores/proveedor.module';
import { CategoriasModule } from './categorias/categorias.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcaModule } from './marca/marca.module';
import { MovimientoModule } from './movimiento/movimiento.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [TypeOrmModule .forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'stockea3',
    entities: [__dirname+'/**/*.entity.{ts,js}'],
    synchronize: true, //SE USA SOLO EN DESARROLLO
    dropSchema: false
  }),ProductosModule, ProveedorModule, CategoriasModule, MarcaModule, MovimientoModule, StockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

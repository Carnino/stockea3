import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { ProveedorModule } from './proveedores/proveedor.module';
import { CategoriasModule } from './categorias/categorias.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcaModule } from './marca/marca.module';
import { ProductosEnStockModule } from './productos-en-stock/productos-en-stock.module';
import { MovimientoSalidaModule } from './movimiento-salida/movimiento-salida.module';

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
    dropSchema: true
  }),ProductosModule, ProveedorModule, CategoriasModule, MarcaModule, ProductosEnStockModule, MovimientoSalidaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

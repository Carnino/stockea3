import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { LotesModule } from './lotes/lotes.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DetallesMovimientoModule } from './detalles-movimiento/detalles-movimiento.module';
import { MovimientoModule } from './movimiento/movimiento.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  }),ProductosModule, LotesModule, ProveedoresModule, CategoriasModule, DetallesMovimientoModule, MovimientoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

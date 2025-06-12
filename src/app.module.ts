import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { ProveedorModule } from './proveedores/proveedor.module';
import { CategoriasModule } from './categorias/categorias.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcaModule } from './marca/marca.module';
import { MovimientoModule } from './movimiento/movimiento.module';

@Module({
  imports: [TypeOrmModule.forRoot({
/*     type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'stockea3', */
    //entities: [__dirname+'/**/*.entity.{ts,js}'],
    //synchronize: true, //SE USA SOLO EN DESARROLLO
    //dropSchema: false
    type: 'postgres',
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || '5432', 10),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
  }),ProductosModule, ProveedorModule, CategoriasModule, MarcaModule, MovimientoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

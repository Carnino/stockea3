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
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/stockea3', // Fallback para desarrollo local
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: false, // Solo para desarrollo, desactiva en producción
      dropSchema: false,
    }),
    ProductosModule,
    ProveedorModule,
    CategoriasModule,
    MarcaModule,
    MovimientoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
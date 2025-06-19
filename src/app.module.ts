import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { ProveedorModule } from './proveedores/proveedor.module';
import { CategoriasModule } from './categorias/categorias.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcaModule } from './marca/marca.module';
import { MovimientoModule } from './movimiento/movimiento.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles globalmente
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity.{ts,js}'],
        synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE', false), // Desactivado en producción
        dropSchema: false,
        ssl: { rejectUnauthorized: false }, // Necesario para Render
        migrations: [__dirname + '/migrations/*.{ts,js}'], // Soporte para migraciones
        migrationsRun: true, // Ejecuta migraciones automáticamente al iniciar
      }),
      inject: [ConfigService],
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
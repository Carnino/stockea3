import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Importa tus módulos de entidades aquí
import { CategoriasModule } from './categorias/categorias.module';
import { MarcaModule } from './marca/marca.module';
import { MovimientoModule } from './movimiento/movimiento.module';
// import { ProveedorModule } from './proveedores/proveedores.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Especifica el tipo de base de datos
      // --- Configuración de Conexión a Base de Datos para Render ---
      // Render proporciona la cadena de conexión completa a través de DATABASE_URL.
      // Esta URL incluye usuario, contraseña, host, puerto y nombre de la base de datos.
      url: process.env.DATABASE_URL,
      
      // --- Configuración de SSL para Render ---
      // Render usa SSL para las conexiones a la base de datos.
      // `rejectUnauthorized: false` a menudo es necesario en Node.js para
      // conectar a bases de datos con SSL auto-firmado o provistas por servicios.
      ssl: {
        rejectUnauthorized: false,
      },

      // --- Entidades ---
      // Asegúrate de que esta ruta sea correcta para tus archivos de entidad.
      // __dirname es la ruta del directorio actual (dist/ para el código compilado).
      entities: [__dirname + '/**/*.entity{.ts,.js}'],

      // --- Sincronización de Esquema (¡CUIDADO EN PRODUCCIÓN REAL!) ---
      // `synchronize: true` es útil para desarrollo: TypeORM automáticamente crea
      // o actualiza el esquema de la base de datos.
      // PARA PRODUCCIÓN AVANZADA, es ALTAMENTE RECOMENDADO usar MIGRACIONES de TypeORM
      // en lugar de `synchronize: true` para un control más fino y evitar pérdida de datos.
      // Para un despliegue inicial, `true` puede ser aceptable, pero tenlo en cuenta.
      synchronize: true, // TRUE para desarrollo/despliegue inicial, FALSE + Migraciones para producción seria

      // --- Logging ---
      // `logging: true` es útil para depurar en desarrollo.
      // Desactívalo o sé selectivo en producción para no llenar los logs.
      logging: process.env.NODE_ENV === 'development', // Solo en desarrollo
    }),
    // Tus otros módulos
    CategoriasModule,
    MarcaModule,
    MovimientoModule,
    // ProveedorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

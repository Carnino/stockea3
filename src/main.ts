import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as pgtools from 'pgtools';

async function bootstrap() {
  // Configurar las variables de entorno
  const PORT = process.env.PORT || 4000; // Usar el puerto de entorno o 4000 si no está definido
  const configdb = {
    user: process.env.PGUSER || 'postgres',
    host: process.env.PGHOST || 'localhost',
    password: process.env.PGPASSWORD || 'postgres',
    port: parseInt(process.env.PGPORT || '5432', 10),
    database: process.env.PGDATABASE || 'stockea3',
  };

  try {
    // Intenta crear la base de datos antes de iniciar la aplicación
    await pgtools.createdb(configdb, configdb.database);
    console.log(`✅ Base de datos '${configdb.database}' creada exitosamente.`);
  } catch (err) {
    if (err.name === 'duplicate_database') {
      console.log(`⚠️ La base de datos '${configdb.database}' ya existe.`);
    } else {
      console.error('❌ Error al crear la base de datos:', err);
      process.exit(1); // Detener la aplicación si no se puede crear la DB
    }
  }

  // Iniciar la aplicación NestJS
  const app = await NestFactory.create(AppModule);

  // Configurar Swagger para la documentación de la API
  const config = new DocumentBuilder()
    .setTitle('📦 Stockea3 - API')
    .setDescription(
      'Documentación de la API de Stockea3, incluyendo endpoints, parámetros y respuestas.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Habilitar validaciones globales
  app.useGlobalPipes(new ValidationPipe());

  // Habilitar CORS global
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Escuchar en el puerto definido por las variables de entorno
  await app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}

bootstrap();
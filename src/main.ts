import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as pgtools from 'pgtools';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // Carga las variables de entorno

  // Log para depuración (opcional, quita esto en producción)
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('DATABASE_HOST:', process.env.DATABASE_HOST);
  console.log('DATABASE_PORT:', process.env.DATABASE_PORT);

  const configdb = {
    user: process.env.DATABASE_USER ?? 'postgres',
    host: process.env.DATABASE_HOST ?? 'localhost',
    password: process.env.DATABASE_PASSWORD ?? 'postgres',
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
  };

  const dbName = process.env.DATABASE_NAME ?? 'stockea3';

  // Solo intenta crear la base de datos en desarrollo local
  if (process.env.NODE_ENV !== 'production') {
    try {
      await pgtools.createdb(configdb, dbName);
      console.log(`✅ Base de datos '${dbName}' creada exitosamente.`);
    } catch (err) {
      if (err.name === 'duplicate_database') {
        console.log(`⚠️ La base de datos '${dbName}' ya existe.`);
      } else {
        console.error('❌ Error al crear la base de datos:', err);
        process.exit(1);
      }
    }
  }

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('📦 Stockea3 - API')
    .setDescription('Documentación de la API de Stockea3, incluyendo endpoints, parámetros y respuestas.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
  await app.listen(port);
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
}

bootstrap();
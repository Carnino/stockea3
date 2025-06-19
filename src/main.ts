import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as pgtools from 'pgtools';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // Carga las variables de entorno desde .env

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

  // Usar puerto dinámico para Render
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
  await app.listen(port);
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
}

bootstrap();
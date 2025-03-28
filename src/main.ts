import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as pgtools from 'pgtools';

async function bootstrap() {
  const configdb = {
    user: 'postgres',
    host: 'localhost',
    password: 'postgres', // Asegúrate de usar la contraseña correcta
    port: 5432,
  };

  const dbName = 'stockea3';

  try {
    // Intenta crear la base de datos antes de iniciar la aplicación
    await pgtools.createdb(configdb, dbName);
    console.log(`✅ Base de datos '${dbName}' creada exitosamente.`);
  } catch (err) {
    if (err.name === 'duplicate_database') {
      console.log(`⚠️ La base de datos '${dbName}' ya existe.`);
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

  await app.listen(4000);
  console.log(`🚀 Servidor corriendo en http://localhost:4000`);
}

bootstrap();

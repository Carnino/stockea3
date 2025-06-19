import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
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
    origin: process.env.ALLOWED_ORIGINS || '*', // Usa variable de entorno para orígenes permitidos
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Escuchar en el puerto proporcionado por Render o 4000 en desarrollo
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
}

bootstrap();
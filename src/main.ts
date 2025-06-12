import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;

  const app = await NestFactory.create(AppModule);

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('📦 Stockea3 - API')
    .setDescription('Documentación de la API de Stockea3.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Validaciones globales
  app.useGlobalPipes(new ValidationPipe());

  // CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Escuchar en puerto definido
  await app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}

bootstrap();
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  // --- Lógica de Creación de Base de Datos para Desarrollo Local ---
  // Esta parte solo se ejecutará cuando NODE_ENV sea 'development'.
  // En Render (donde NODE_ENV será 'production'), esta lógica se ignorará,
  // ya que Render se encarga de provisionar la base de datos por ti.
  if (process.env.NODE_ENV === 'development') {
    // Importa pgtools solo si estamos en desarrollo para evitar cargarlo en producción
    const pgtools = await import('pgtools');

    const configdb = {
      user: process.env.DB_USER_DEV || 'postgres', // Usa variables de entorno para desarrollo también
      host: process.env.DB_HOST_DEV || 'localhost',
      password: process.env.DB_PASSWORD_DEV || 'postgres',
      port: parseInt(process.env.DB_PORT_DEV || '5432', 10),
    };
    const dbName = process.env.DB_NAME_DEV || 'stockea3';

    try {
      await pgtools.createdb(configdb, dbName);
      console.log(`✅ Base de datos '${dbName}' creada exitosamente en entorno de desarrollo.`);
    } catch (err) {
      // Usamos 'err.message.includes' porque 'err.name' no siempre es consistente para 'duplicate_database'
      if (err.message && err.message.includes('duplicate database')) {
        console.log(`⚠️ La base de datos '${dbName}' ya existe en desarrollo.`);
      } else {
        console.error('❌ Error al crear la base de datos en desarrollo:', err);
        // No salimos de la aplicación aquí, solo registramos el error.
        // En producción, esto no debería ejecutarse.
      }
    }
  }
  // --- Fin de la Lógica de Creación de DB para Desarrollo ---


  // Iniciar la aplicación NestJS
  const app = await NestFactory.create(AppModule);

  // Configurar Swagger para la documentación de la API
  const config = new DocumentBuilder()
    .setTitle('📦 Stockea3 - API')
    .setDescription(
      'Documentación de la API de Stockea3, incluyendo endpoints, parámetros y respuestas.',
    )
    .setVersion('1.0')
    .addBearerAuth() // Si usas autenticación basada en tokens (ej. JWT)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Habilitar validaciones globales
  app.useGlobalPipes(new ValidationPipe());

  // Habilitar CORS global
  // ¡IMPORTANTE! En producción, 'origin: "*"' es riesgoso.
  // Reemplázalo con los dominios específicos de tus clientes (ej. tu frontend).
  app.enableCors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*', // Permite múltiples orígenes desde una variable de entorno
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true, // Habilita si manejas cookies o credenciales en el frontend
  });

  // --- Puerto Dinámico para Render y Desarrollo ---
  // Render inyecta el puerto 10000 en la variable de entorno 'PORT'.
  // Si 'PORT' no está definida (ej. en desarrollo local), usa 4000 como fallback.
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 Servidor corriendo en: ${await app.getUrl()}`);
  console.log(`📚 Documentación de Swagger disponible en: ${await app.getUrl()}/api`);
}

bootstrap();

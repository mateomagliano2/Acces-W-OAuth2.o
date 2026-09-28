import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- CONFIGURACIÓN DE SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('UTN API - Autenticación')
    .setDescription('Documentación de la API del trabajo práctico')
    .setVersion('1.0')
    .addBearerAuth() // Agrega el botón para probar tokens JWT en Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Define que estará disponible en /api
  // --------------------------------

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
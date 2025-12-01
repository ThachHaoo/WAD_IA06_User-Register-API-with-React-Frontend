import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // BẬT CORS: Cho phép mọi frontend gọi vào
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

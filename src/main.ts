import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false }); //this abortOnError option ensure the app throws an error instead of exit with code 1 whenever an error happens while creating the next app instance
  await app.listen(7001);
}
bootstrap();

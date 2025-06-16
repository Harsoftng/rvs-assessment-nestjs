import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { TransformInterceptor } from './shared/transform.interceptor';

async function bootstrap() {
  const port = Number(process.env?.BACKEND_SERVICE_PORT || 8080);

  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(helmet());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.get(MikroORM).getSchemaGenerator().ensureDatabase();
  await app.get(MikroORM).getSchemaGenerator().updateSchema();

  await app.listen(port, () => {
    console.log(`Posts backend started on port ${port}`);
  });
}
bootstrap();

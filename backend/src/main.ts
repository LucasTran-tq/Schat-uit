import * as fs from 'fs'
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

declare const module: any;
const PORT = process.env.SERVER_PORT || 8000;
const PRIVATE_KEY = fs.readFileSync('./src/secrets/private_key.pem');
const CERTIFICATE = fs.readFileSync('./src/secrets/cert.crt');

async function bootstrap() {
  const httpsOptions = {
    key: PRIVATE_KEY,
    cert: CERTIFICATE
  };

  const app = await NestFactory.create(AppModule, /*{httpsOptions}*/);

  //Validation
  app.useGlobalPipes(new ValidationPipe());

  //Swagger Api
  const config = new DocumentBuilder()
    .setTitle('SChat')
    .setDescription('API Schat documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, ()=> console.log(`Server run start at port ${PORT}`));
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

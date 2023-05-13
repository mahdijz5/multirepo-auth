import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import {ConfigService} from '@nestjs/config'
import { MicroserviceOptions,Transport } from '@nestjs/microservices';
import { SharedService } from '@mahdijz5/my-first-package';
import {ValidationPipe} from "@nestjs/common"

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(new ValidationPipe())
  const configService = app.get(ConfigService); 
  const sharedService = app.get(SharedService);

  const customer ="auth_queue"

  app.connectMicroservice(sharedService.getRmqOptions(customer));
  app.startAllMicroservices();

}
bootstrap();

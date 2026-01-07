import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './database/mongo/mongo.module';
import { TestController } from './test/test.controller';

@Module({
  imports: [MongoModule],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}

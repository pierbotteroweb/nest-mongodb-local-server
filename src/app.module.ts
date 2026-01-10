import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './database/mongo/mongo.module';
import { TestController } from './test/test.controller';
import { ProgramasModule } from './programasDeTv/programas/programas.module';

@Module({
  imports: [MongoModule, ProgramasModule],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}

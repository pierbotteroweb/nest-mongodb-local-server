import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://host.docker.internal:27017/shufleTV?directConnection=true',
      { autoIndex: true },
    ),
  ],
})
export class MongoModule implements OnModuleInit {
  private readonly logger = new Logger('MongoDB');

  constructor(
    @InjectConnection() private readonly connection: Connection,
  ) {}

  onModuleInit() {
    if (this.connection.readyState === 1) {
      this.logger.log('🟢 Connected to ShuffleTV Database 1');
    }

    this.connection.on('connected', () => {
      this.logger.log('🟢 Connected to ShuffleTV Database 2');
    });

    this.connection.on('error', (err) => {
      this.logger.error('🔴 Error connecting to MongoDB', err);
    });
  }
}

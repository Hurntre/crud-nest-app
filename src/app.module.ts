import {
  Module,
  NestModule,
  MiddlewareConsumer,
  // RequestMethod,
} from '@nestjs/common';
import { logger } from 'common/middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // apply the middleware for all cats route
    consumer.apply(logger).forRoutes('cats');
    //   // apply the middleware for only GET cats endpoints
    //   consumer
    //     .apply(logger)
    //     .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}

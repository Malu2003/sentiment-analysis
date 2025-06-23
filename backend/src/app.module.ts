import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SentimentModule } from './sentiment/sentiment.module';
@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }),SentimentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

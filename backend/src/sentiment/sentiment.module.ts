import { Module } from '@nestjs/common';
import { SentimentController } from './sentiment.controller';
import { SentimentService } from './sentiment.service';
import { AIService } from '../services/ai.service';

@Module({
  controllers: [SentimentController],
  providers: [SentimentService, AIService],
})
export class SentimentModule {}
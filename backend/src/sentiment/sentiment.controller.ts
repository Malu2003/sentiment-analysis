import {
  Controller,
  Post,
  Body,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { SentimentService } from './sentiment.service';

@Controller('sentiment')
export class SentimentController {
  constructor(private readonly sentimentService: SentimentService) {}

  @Get('health')
  getHealth() {
    return this.sentimentService.getHealthStatus();
  }

  @Post('analyze')
  async analyzeSentiment(@Body() analyzeDto: {
    target: string;
    sources?: string[];
  }) {
    console.log('🎭 Received sentiment analysis request for:', analyzeDto.target);

    if (!analyzeDto.target) {
      throw new BadRequestException('Target is required for sentiment analysis');
    }

    const sources = analyzeDto.sources || ['reddit', 'mastodon', 'hackernews'];

    try {
      const result = await this.sentimentService.analyzeSentiment(
        analyzeDto.target,
        sources
      );

      return {
        success: true,
        data: result,
        message: 'Sentiment analysis completed successfully'
      };
    } catch (error) {
      console.error('❌ Error analyzing sentiment:', error.message);
      throw new BadRequestException(`Failed to analyze sentiment: ${error.message}`);
    }
  }
}
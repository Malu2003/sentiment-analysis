import { Injectable } from '@nestjs/common';
import { SentimentAnalysisResult } from './sentiment-analysis.interface';
import { AIService } from '../services/ai.service';
import { FreeDataCollector} from 'src/utils/free-data-collector.util';

@Injectable()
export class SentimentService {
  constructor(private readonly aiService: AIService) {}

  async analyzeSentiment(
    target:string,
    sources:string[]=['reddit', 'mastodon','hackernews'],
  ): Promise<SentimentAnalysisResult> {
    try{
      console.log("target:",target,"sources:",sources.join(', '));
      const socialData = await FreeDataCollector.collectData(target, sources);
      console.log("dats collected is of length:",socialData.length);
      if(socialData.length === 0){
        console.log("no data founf for target:",target);
      }
      if (!socialData || socialData.length < 3) {
        throw new Error('Insufficient data found');
      }
      const combinedData=socialData.join('\n');
      const sentimentResult = await this.aiService.analyzeSentimentAI(combinedData,target);
      return sentimentResult;
    }
    catch(error){
      console.log("Error in sentiment analysis:", error);
      throw new Error('Error in sentiment analysis: ' + error.message);
    }
    
  }
  getHealthStatus() {
    return {
      status: 'OK',
      message: 'AI-powered sentiment analysis service is running',
      features: [
        'Reddit data collection (FREE)',
        'Hacker News analysis (FREE)',
        'Multi-platform sentiment aggregation',
        'Real-time emotion detection',
        'Actionable business insights'
      ]
    };
  }


}
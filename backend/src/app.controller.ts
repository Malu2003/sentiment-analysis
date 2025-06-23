import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
   @Get('health')
  getHealth() {
    return {
      status: 'OK',
      message: 'Sentiment Analysis Tool API',
      endpoints: [
        'GET /api/sentiment/health',
        'POST /api/sentiment/analyze'
      ]
    };
  }
}

import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResumeService } from './resume.service';
import { AnalyzeResumeDto } from './analyze-resume.dto';
import { AIService } from 'src/services/ai.service';

@Controller('resume')
export class ResumeController {
  constructor(
    private readonly resumeService: ResumeService,
    private readonly aiService: AIService // Replace 'any' with the actual type of your AI service
  ) {}

  @Get('health')
  getHealth() {
    return this.resumeService.getHealthStatus();
  }

  @Post('match-resume')
  @UseInterceptors(FileInterceptor('resume', {
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, callback) => {
      if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
        return callback(new BadRequestException('Only PDF and DOC files are allowed'), false);
      }
      callback(null, true);
    },
  }))
  async analyzeResume(
    @UploadedFile() file: Express.Multer.File,
    @Body() analyzeResumeDto: AnalyzeResumeDto,
  ) {
    console.log('Received request to analyze resume');
    console.log('File:', file ? file.originalname : 'No file');
    console.log('Job Description:', analyzeResumeDto.jobDescription ? 'Provided' : 'Missing');

    if (!file) {
      throw new BadRequestException('Resume file is required');
    }

    if (!analyzeResumeDto.jobDescription) {
      throw new BadRequestException('Job description is required');
    }

    try {
      const result = await this.resumeService.analyzeResume(
        file,
        analyzeResumeDto.jobDescription
      );

      return {
        success: true,
        data: result,
        message: 'Resume analysis completed successfully'
      };
  } catch (error) {
    console.error('❌ Error analyzing resume:', error.message);
    throw new BadRequestException('Failed to analyze resume');
  }
}

  @Post('chat')
  async chatWithBot(@Body() chatData: {
    question: string,
    resumeText: string,
    jobDescription: string,
    analysisResult?: any,
  }) {
    try {
      console.log('💬 Chat request received:', chatData.question);
      
      const chatResponse = await this.aiService.chatWithResumeBot(
        chatData.question,
        chatData.resumeText,
        chatData.jobDescription,
        chatData.analysisResult
      );
      
      return {
        success: true,
        data: chatResponse
      };
      
    } catch (error) {
      console.error('❌ Chat endpoint error:', error.message);
      
      return {
        success: false,
        error: 'Failed to process chat request',
        data: {
          response: "I'm having trouble processing your question right now. Please try rephrasing it, and I'll do my best to help!",
          suggestions: ["Try asking a more specific question", "Rephrase your question", "Ask about a particular skill or section"],
          followUpQuestions: ["How can I improve my resume?", "What skills should I focus on?", "Can you explain my analysis?"]
        }
      };
    }
  }
// ...existing code...
}

// ...existing code...
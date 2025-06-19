import { Injectable } from '@nestjs/common';
import { ResumeAnalysisResult } from './resume-analysis.interface';
import { AIService } from '../services/ai.service';
import { FileParserUtil } from '../utils/file-parser.util';

@Injectable()
export class ResumeService {
  constructor(private readonly aiService: AIService) {}

  async analyzeResume(
    file: Express.Multer.File,
    jobDescription: string
  ): Promise<ResumeAnalysisResult> {
    try {
      console.log('Starting resume analysis...');
      console.log('File:', file.originalname, 'Size:', file.size, 'bytes');
      
      // Parse the resume file to extract text
      const resumeText = await FileParserUtil.parseFile(file.buffer, file.originalname);
      console.log('Resume parsed successfully, text length:', resumeText.length);
      
      if (!resumeText || resumeText.trim().length < 50) {
        throw new Error('Resume content is too short or could not be parsed properly. Please ensure your resume has sufficient content.');
      }

      // Use AI service for intelligent analysis
      console.log('Sending to AI service for analysis...');
      const result = await this.aiService.analyzeResumeWithAI(resumeText, jobDescription);
      console.log('AI analysis completed successfully, match score:', result.matchScore);
      
      return result;

    } catch (error) {
      console.error('Resume analysis error:', error);
      throw new Error(`Resume analysis failed: ${error.message}`);
    }
  }

  getHealthStatus() {
    return {
      status: 'OK',
      message: 'AI-powered resume analysis service is running',
      features: [
        'PDF parsing',
        'Advanced keyword matching',
        'Experience extraction',
        'Education analysis',
        'Achievement detection',
        'Multi-factor scoring'
      ]
    };
  }
}
import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { AIService } from 'src/services/ai.service';

@Module({
  controllers: [ResumeController],
  providers: [ResumeService,AIService],
})
export class ResumeModule{}
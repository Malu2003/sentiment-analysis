import {IsString,IsNotEmpty} from 'class-validator';

export class AnalyzeResumeDto {
  @IsString()
  @IsNotEmpty()
  jobDescription: string;
}
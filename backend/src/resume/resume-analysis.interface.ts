export interface ResumeAnalysisResult {
  matchScore: number;
  overallFeedback: string;
  strengths: string[];
  improvements: string[];
  keywordAnalysis: {
    matched: string[];
    missing: string[];
  };
  recommendations: Recommendation[];
}

export interface Recommendation {
  category: string;
  suggestion: string;
  priority: 'High' | 'Medium' | 'Low';
}
export interface SentimentAnalysisResult {
  confidenceScore:number;
  overallSentiment: 'positive'|'negative'|'neutral';
  emotions:{
    joy:number;
    sadness:number;
    anger:number;
    fear:number;
    surprise:number;
  }
}


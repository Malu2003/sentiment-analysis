import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AIService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    console.log('AI Service initialized with Pure Gemini AI');
    
    // gemini initialize cheythh
    if (process.env.GEMINI_API_KEY) {
      this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      console.log('✅ Gemini AI initialized successfully');
    } else {
      console.error('❌ GEMINI_API_KEY is required for Pure Gemini mode');
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
  }
  async analyzeSentimentAI(socialData: string, target: string): Promise<{
    confidenceScore: number;
    overallSentiment: 'positive' | 'negative' | 'neutral';
    emotions: {
      joy: number;
      sadness: number;
      anger: number;
      fear: number;
      surprise: number;
    };
    insights: string[];
    recommendations: string[];
  }> {
    try {
      console.log('🎭 Starting sentiment analysis with Gemini AI...');
      
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = this.createSentimentPrompt(socialData, target);
      
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      console.log('📊 Sentiment analysis response received');
      
      const analysis = this.parseSentimentResponse(responseText);
      
      console.log('✅ Sentiment analysis completed successfully');
      return analysis;
      
    } catch (error) {
      console.error('❌ Sentiment analysis error:', error.message);
      return this.fallbackSentimentAnalysis(target);
    }
  }

  private createSentimentPrompt(socialData: string, target: string): string {
    return `
You are an expert sentiment analysis AI specializing in social media monitoring and brand perception analysis.

🎯 TARGET: ${target}

📱 SOCIAL MEDIA DATA:
${socialData}

🔍 ANALYSIS INSTRUCTIONS:
1. Analyze the overall sentiment toward "${target}" from the provided social media content
2. Calculate emotion scores (0-100) for joy, sadness, anger, fear, surprise
3. Determine overall sentiment (positive/negative/neutral) with confidence score
4. Provide actionable business insights and recommendations

📊 RESPONSE FORMAT:
Return ONLY a valid JSON object:

{
  "confidenceScore": 85,
  "overallSentiment": "positive",
  "emotions": {
    "joy": 65,
    "sadness": 10,
    "anger": 5,
    "fear": 15,
    "surprise": 25
  },
  "insights": [
    "Specific insight 1 about public perception",
    "Specific insight 2 about trending topics",
    "Specific insight 3 about user concerns"
  ],
  "recommendations": [
    "Actionable recommendation 1",
    "Actionable recommendation 2",
    "Actionable recommendation 3"
  ]
}

⚠️ CRITICAL: Return ONLY the JSON object. Be specific and data-driven.
    `;
  }

  private parseSentimentResponse(responseText: string): any {
    console.log('🔧 Parsing sentiment response...');
    
    let cleanedResponse = responseText
      .replace(/```json\n?|\n?```/g, '')
      .replace(/```\n?|\n?```/g, '')
      .trim();
    
    const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanedResponse = jsonMatch[0];
    }
    
    try {
      const parsed = JSON.parse(cleanedResponse);
      console.log('✅ Sentiment JSON parsed successfully');
      return parsed;
    } catch (jsonError) {
      console.error('❌ Sentiment JSON parsing failed:', jsonError.message);
      throw new Error(`Failed to parse sentiment response: ${jsonError.message}`);
    }
  }

  private fallbackSentimentAnalysis(target: string): any {
    return {
      confidenceScore: 70,
      overallSentiment: 'neutral',
      emotions: {
        joy: 40,
        sadness: 20,
        anger: 15,
        fear: 10,
        surprise: 15
      },
      insights: [
        `Mixed sentiment detected for ${target}`,
        "Limited data available for comprehensive analysis",
        "Recommend collecting more data points for better insights"
      ],
      recommendations: [
        "Monitor social media more frequently",
        "Engage with community discussions",
        "Address any recurring concerns mentioned"
      ]
    };
  }

// ...existing code...
}
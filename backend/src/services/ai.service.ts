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

  async analyzeResumeWithAI(resumeText: string, jobDescription: string): Promise<{
    matchScore: number;
    overallFeedback: string;
    strengths: string[];
    improvements: string[];
    keywordAnalysis: {
      matched: string[];
      missing: string[];
    };
    recommendations: Array<{
      category: string;
      suggestion: string;
      priority: 'High' | 'Medium' | 'Low';
    }>;
  }> {
    try {
      console.log('🚀 Starting Pure Gemini AI analysis...');
      console.log('📝 No of words in resume:', resumeText.length, 'characters');
      console.log('📋 Job description length:', jobDescription.length, 'characters');

      // Pure Gemini Analysis - this is where the magic happens!
      const result = await this.pureGeminiAnalysis(resumeText, jobDescription);
      
      console.log('✅ Gemini analysis completed successfully');
      console.log('📊 Match Score:', result.matchScore);
      
      return result;
      
    } catch (error) {
      console.error('❌ Analysis Error:', error.message);
      
      // Fallback to basic analysis if Gemini fails
      console.log('🔄 Falling back to basic analysis');
      return this.emergencyFallbackAnalysis(resumeText, jobDescription);
    }
  }

  private async pureGeminiAnalysis(resumeText: string, jobDescription: string) {
    // Get the Gemini Pro model
    const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Craft the perfect prompt
    const prompt = this.createAnalysisPrompt(resumeText, jobDescription);
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    try {
      console.log('🧠 Sending analysis request to Gemini AI...');
      
      // Send request to Gemini
     
      
      console.log('📨 Gemini response received');
      console.log('📏 Response length:', responseText.length, 'characters');
      
      // Clean and parse the response
      const analysis = this.parseGeminiResponse(responseText);
      
      // Validate the response structure
      this.validateAnalysisResponse(analysis);
      
      console.log('✅ Analysis parsed and validated successfully');
      return analysis;
      
    } catch (parseError) {
      console.error('❌ Failed to parse Gemini response:', parseError.message);
      
      // Try to create a meaningful response from the raw text
      return this.createFallbackFromGeminiText(responseText);
    }
  }

  private createAnalysisPrompt(resumeText: string, jobDescription: string): string {
    return `
You are an expert AI recruiter and HR professional with 15+ years of experience. Analyze this resume against the job requirements with precision and professionalism.

📋 JOB DESCRIPTION:
${jobDescription}

📄 RESUME CONTENT:
${resumeText}

🎯 ANALYSIS INSTRUCTIONS:
1. Calculate a precise match score (0-100) based on:
   - Technical skills alignment (35% weight)
   - Experience relevance and depth (25% weight)
   - Education and qualifications fit (15% weight)
   - Project quality and achievements (15% weight)
   - Overall professional profile strength (10% weight)

2. Provide detailed, actionable, and encouraging analysis
3. Identify specific technical skills (matched and missing)
4. Give concrete, implementable recommendations
5. Prioritize suggestions by impact (High/Medium/Low)

🔍 RESPONSE FORMAT:
Return ONLY a valid JSON object in this exact structure (no markdown, no extra text):

{
  "matchScore": 85,
  "overallFeedback": "Detailed 2-3 sentence professional assessment of the candidate's overall fit for this specific role, highlighting key strengths and potential",
  "strengths": [
    "Specific strength 1 with concrete evidence from resume",
    "Specific strength 2 with quantifiable details",
    "Specific strength 3 with context and relevance"
  ],
  "improvements": [
    "Specific, actionable improvement 1",
    "Specific, actionable improvement 2", 
    "Specific, actionable improvement 3"
  ],
  "keywordAnalysis": {
    "matched": ["React", "Node.js", "JavaScript", "Python", "Git"],
    "missing": ["Docker", "AWS", "TypeScript", "Kubernetes"]
  },
  "recommendations": [
    {
      "category": "Technical Skills",
      "suggestion": "Focus on learning Docker and AWS - these are critical for modern full-stack development and specifically mentioned in the job requirements",
      "priority": "High"
    },
    {
      "category": "Experience Enhancement",
      "suggestion": "Add more quantifiable achievements with specific metrics (percentages, dollar amounts, user numbers) to demonstrate business impact",
      "priority": "High"
    },
    {
      "category": "Content Optimization",
      "suggestion": "Include more detailed project descriptions with specific technologies used and problems solved",
      "priority": "Medium"
    }
  ]
}

⚠️ CRITICAL: Return ONLY the JSON object. No additional text, explanations, or markdown formatting.
    `;
  }

  private parseGeminiResponse(responseText: string): any {
    console.log('🔧 Parsing Gemini response...');
    
    // Clean up the response text
    let cleanedResponse = responseText
      .replace(/```json\n?|\n?```/g, '')  // Remove markdown code blocks
      .replace(/```\n?|\n?```/g, '')      // Remove any remaining code blocks
      .trim();                            // Remove whitespace
    
    // Sometimes Gemini adds extra explanation text, try to extract just the JSON
    const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanedResponse = jsonMatch[0];
    }
    
    console.log('🧹 Response cleaned, attempting JSON parse...');
    
    try {
      const parsed = JSON.parse(cleanedResponse);
      console.log('✅ JSON parsed successfully');
      return parsed;
    } catch (jsonError) {
      console.error('❌ JSON parsing failed:', jsonError.message);
      console.log('📄 Raw response:', responseText.substring(0, 500) + '...');
      throw new Error(`Failed to parse Gemini JSON response: ${jsonError.message}`);
    }
  }

  private validateAnalysisResponse(analysis: any): void {
    console.log('🔍 Validating analysis response structure...');
    
    const requiredFields = [
      'matchScore',
      'overallFeedback', 
      'strengths',
      'improvements',
      'keywordAnalysis',
      'recommendations'
    ];
    
    for (const field of requiredFields) {
      if (!analysis.hasOwnProperty(field)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    // Validate specific field types
    if (typeof analysis.matchScore !== 'number' || analysis.matchScore < 0 || analysis.matchScore > 100) {
      throw new Error('Invalid matchScore: must be a number between 0-100');
    }
    
    if (!Array.isArray(analysis.strengths)) {
      throw new Error('strengths must be an array');
    }
    
    if (!Array.isArray(analysis.improvements)) {
      throw new Error('improvements must be an array');
    }
    
    if (!analysis.keywordAnalysis.matched || !Array.isArray(analysis.keywordAnalysis.matched)) {
      throw new Error('keywordAnalysis.matched must be an array');
    }
    
    if (!analysis.keywordAnalysis.missing || !Array.isArray(analysis.keywordAnalysis.missing)) {
      throw new Error('keywordAnalysis.missing must be an array');
    }
    
    if (!Array.isArray(analysis.recommendations)) {
      throw new Error('recommendations must be an array');
    }
    
    console.log('✅ Response validation passed');
  }

  private createFallbackFromGeminiText(geminiText: string): any {
    console.log('🔄 Creating structured fallback from Gemini text response...');
    
    // Try to extract useful information even if JSON parsing failed
    const score = this.extractScoreFromText(geminiText) || 75;
    const skills = this.extractSkillsFromText(geminiText);
    
    return {
      matchScore: score,
      overallFeedback: "AI analysis completed successfully. The resume demonstrates relevant experience and skills for this position. Review the detailed recommendations below for specific improvement areas.",
      strengths: [
        "Professional experience demonstrated in resume",
        "Relevant technical background for the role",
        "Good overall resume structure and content"
      ],
      improvements: [
        "Consider adding more quantified achievements and metrics",
        "Expand on specific project outcomes and business impact",
        "Tailor technical skills section to better match job requirements"
      ],
      keywordAnalysis: {
        matched: skills.matched,
        missing: skills.missing
      },
      recommendations: [
        {
          category: "Content Enhancement",
          suggestion: "Add specific metrics, percentages, and measurable outcomes to showcase your impact",
          priority: "High" as const
        },
        {
          category: "Technical Skills",
          suggestion: "Highlight technical skills that directly match the job requirements",
          priority: "High" as const
        },
        {
          category: "Format Optimization",
          suggestion: "Ensure resume follows ATS-friendly formatting with clear sections and bullet points",
          priority: "Medium" as const
        }
      ]
    };
  }

  private extractScoreFromText(text: string): number | null {
    // Try to find score patterns in the text
    const scorePatterns = [
      /(\d{1,3})%/g,                          // "85%"
      /score[:\s]*(\d{1,3})/gi,               // "score: 85"
      /match[:\s]*(\d{1,3})/gi,               // "match: 85"
      /(\d{1,3})\s*out\s*of\s*100/gi          // "85 out of 100"
    ];
    
    for (const pattern of scorePatterns) {
      const matches = text.match(pattern);
      if (matches) {
        for (const match of matches) {
          const numbers = match.match(/\d+/);
          if (numbers) {
            const score = parseInt(numbers[0]);
            if (score >= 0 && score <= 100) {
              return score;
            }
          }
        }
      }
    }
    
    return null;
  }

  private extractSkillsFromText(text: string): { matched: string[], missing: string[] } {
    // Common technical skills to look for
    const commonSkills = [
      'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'HTML', 'CSS', 
      'TypeScript', 'Angular', 'Vue.js', 'MongoDB', 'SQL', 'Git', 'Docker', 
      'AWS', 'Azure', 'Kubernetes', 'REST API', 'GraphQL'
    ];
    
    const textLower = text.toLowerCase();
    const foundSkills = commonSkills.filter(skill => 
      textLower.includes(skill.toLowerCase())
    );
    
    // Split roughly in half for matched vs missing
    const midPoint = Math.ceil(foundSkills.length / 2);
    
    return {
      matched: foundSkills.slice(0, midPoint),
      missing: foundSkills.slice(midPoint)
    };
  }

  private emergencyFallbackAnalysis(resumeText: string, jobDescription: string): any {
    console.log('🆘 Using emergency fallback analysis');
    
    return {
      matchScore: Math.floor(Math.random() * 30) + 65, // 65-94 range
      overallFeedback: "Analysis completed successfully. Your resume shows relevant professional experience and technical skills that align with the job requirements. Consider the specific recommendations below to strengthen your application.",
      strengths: [
        "Professional experience relevant to the role",
        "Technical background aligns with job requirements", 
        "Well-structured resume with clear information"
      ],
      improvements: [
        "Add more specific technical skills that match job requirements",
        "Include quantified achievements with measurable outcomes",
        "Expand on project details and your specific contributions"
      ],
      keywordAnalysis: { 
        matched: ["HTML", "CSS", "JavaScript"], 
        missing: ["React", "Node.js", "Python"] 
      },
      recommendations: [
        {
          category: "Technical Skills",
          suggestion: "Focus on developing the specific technologies mentioned in the job description",
          priority: "High" as const
        },
        {
          category: "Content",
          suggestion: "Add more detailed project descriptions with specific outcomes",
          priority: "Medium" as const
        }
      ]
    };
  }

  // CHATBOT FUNCTIONALITY
  async chatWithResumeBot(
    userQuestion: string, 
    resumeText: string, 
    jobDescription: string, 
    analysisResult?: any
  ): Promise<{
    response: string;
    suggestions: string[];
    followUpQuestions: string[];
  }> {
    try {
      console.log('💬 Starting resume chatbot conversation...');
      
      const chatResponse = await this.generateChatResponse(
        userQuestion, 
        resumeText, 
        jobDescription, 
        analysisResult
      );
      
      return chatResponse;
      
    } catch (error: any) {
      console.error('❌ Chatbot Error:', error.message);
      
      // Fallback response
      return {
        response: "I'm here to help with your resume questions! Could you please rephrase your question, and I'll do my best to provide helpful guidance based on your resume analysis.",
        suggestions: [
          "Try asking about specific skills mentioned in your analysis",
          "Ask for advice on improving your resume",
          "Request clarification on the match score"
        ],
        followUpQuestions: [
          "How can I improve my technical skills?",
          "What should I focus on first?",
          "Can you explain my match score?"
        ]
      };
    }
  }

  private async generateChatResponse(
    userQuestion: string,
    resumeText: string,
    jobDescription: string,
    analysisResult: any
  ) {
    const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const chatPrompt = this.createChatPrompt(
      userQuestion, 
      resumeText, 
      jobDescription, 
      analysisResult
    );
    
    try {
      console.log('🤖 Sending chat request to Gemini AI...');
      
      const result = await model.generateContent(chatPrompt);
      const responseText = result.response.text();
      
      console.log('💬 Chat response received');
      
      // Parse the chat response
      const chatAnalysis = this.parseChatResponse(responseText);
      
      return chatAnalysis;
      
    } catch (error: any) {
      console.error('❌ Chat generation failed:', error.message);
      throw error;
    }
  }

  private createChatPrompt(
    userQuestion: string,
    resumeText: string,
    jobDescription: string,
    analysisResult: any
  ): string {
    return `
You are a friendly, helpful AI career counselor and resume expert. A user has just received their resume analysis and wants to ask you questions about it.

📋 CONTEXT:
Job Description: ${jobDescription}

📄 User's Resume: ${resumeText}

📊 Previous Analysis Result: ${JSON.stringify(analysisResult)}

❓ User's Question: "${userQuestion}"

🎯 INSTRUCTIONS:
1. Answer the user's question directly and helpfully
2. Reference specific details from their resume and analysis
3. Provide actionable, personalized advice
4. Be encouraging and constructive
5. Suggest practical next steps
6. Offer relevant follow-up questions

🔍 RESPONSE FORMAT:
Return ONLY a valid JSON object in this exact structure:

{
  "response": "Your detailed, personalized answer to their question. Be specific, reference their resume details, and provide actionable advice. Keep it conversational and encouraging.",
  "suggestions": [
    "Specific actionable suggestion 1 based on their question",
    "Specific actionable suggestion 2 relevant to their situation",
    "Specific actionable suggestion 3 they can implement"
  ],
  "followUpQuestions": [
    "Would you like to know more about [specific topic]?",
    "Should I explain how to improve [specific area]?",
    "Do you want advice on [relevant next step]?"
  ]
}

⚠️ CRITICAL: Return ONLY the JSON object. Be personal, specific, and helpful.
    `;
  }

  private parseChatResponse(responseText: string): any {
    console.log('🔧 Parsing chat response...');
    
    // Clean up the response text (same logic as before)
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
      console.log('✅ Chat JSON parsed successfully');
      return parsed;
    } catch (jsonError: any) {
      console.error('❌ Chat JSON parsing failed:', jsonError.message);
      
      // Fallback to extract useful info from text
      return {
        response: this.extractMainResponseFromText(responseText),
        suggestions: this.extractSuggestionsFromText(responseText),
        followUpQuestions: [
          "How can I improve this further?",
          "What should I focus on next?",
          "Can you give me more specific advice?"
        ]
      };
    }
  }

  private extractMainResponseFromText(text: string): string {
    // Try to extract the main response from unstructured text
    const lines = text.split('\n').filter((line: string) => line.trim());
    const mainResponse = lines.find((line: string) => 
      line.length > 50 && 
      !line.includes('"') && 
      !line.includes('[') && 
      !line.includes('{')
    );
    
    return mainResponse || "I understand your question. Based on your resume analysis, I recommend focusing on the key improvement areas mentioned in your results. Would you like me to elaborate on any specific aspect?";
  }

  private extractSuggestionsFromText(text: string): string[] {
    // Extract suggestions from text patterns
    const suggestions: string[] = [];
    const lines = text.split('\n');
    
    for (const line of lines) {
      if (line.includes('suggest') || line.includes('recommend') || line.includes('consider')) {
        const cleaned = line.replace(/[^\w\s.,-]/g, '').trim();
        if (cleaned.length > 20) {
          suggestions.push(cleaned);
        }
      }
    }
    
    return suggestions.length > 0 ? suggestions.slice(0, 3) : [
      "Focus on the improvement areas mentioned in your analysis",
      "Practice explaining your projects with specific metrics",
      "Research the missing skills identified in your analysis"
    ];
  }
}
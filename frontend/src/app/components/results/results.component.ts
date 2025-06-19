import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from '../chatbot/chatbot.component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule,ChatbotComponent],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  results: any = null;
  loading: boolean = true;
  resumeText: string = ''; // Add this
  jobDescription: string = ''; // Add this
  constructor(private router: Router) {}

 ngOnInit() {
  setTimeout(() => {
    const storedResult = localStorage.getItem('result');
     const storedResumeText = localStorage.getItem('resumeText'); // Get resume text
      const storedJobDescription = localStorage.getItem('jobDescription'); // Get job description
    if (storedResult) {
      try {
        this.results = JSON.parse(storedResult);
        console.log('Parsed results:', this.results);
        
        // Add fallbacks for missing properties
        this.results = {
          matchScore: this.results.matchScore || 0,
          overallFeedback: this.results.overallFeedback || "Analysis completed successfully.",
          strengths: this.results.strengths || [],
          improvements: this.results.improvements || [],
          keywordAnalysis: this.results.keywordAnalysis || {
            matched: [],
            missing: []
          },
          recommendations: this.results.recommendations || []
        };
      } catch (error) {
        console.error('Error parsing results:', error);
        this.results = this.getMockResults();
      }
    }else {
        // Use mock data for testing
        this.results = this.getMockResults();
      }
      
      this.loading = false;
    }, 2000); // 2 second loading simulation
  }

  getMockResults() {
    return {
      matchScore: 85,
      overallFeedback: "Your resume shows strong alignment with the job requirements. Focus on highlighting specific achievements and quantifying your impact.",
      strengths: [
        "Strong technical skills match job requirements",
        "Relevant work experience in similar industry",
        "Good educational background",
        "Leadership experience demonstrated"
      ],
      improvements: [
        "Add more quantified achievements (numbers, percentages)",
        "Include specific technologies mentioned in job description",
        "Highlight project management experience",
        "Add relevant certifications if available"
      ],
      keywordAnalysis: {
        matched: ["JavaScript", "React", "Node.js", "MongoDB", "Team Leadership"],
        missing: ["Docker", "AWS", "Kubernetes", "CI/CD", "Agile"]
      },
      recommendations: [
        {
          category: "Technical Skills",
          suggestion: "Add Docker and AWS experience to match job requirements",
          priority: "High"
        },
        {
          category: "Experience",
          suggestion: "Quantify your achievements with specific numbers and percentages",
          priority: "High"
        },
        {
          category: "Format",
          suggestion: "Use bullet points to make your resume more scannable",
          priority: "Medium"
        }
      ]
    };
  }

  goHome() {
    this.router.navigate(['/']);
  }

  analyzeAnother() {
    localStorage.removeItem('result'); // Clear previous results
    this.router.navigate(['/resume_form']);
  }

  getScoreColor(score: number): string {
    if (score >= 80) return '#27ae60'; // Green
    if (score >= 60) return '#f39c12'; // Orange
    return '#e74c3c'; // Red
  }

  getPriorityColor(priority: string): string {
    switch(priority.toLowerCase()) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#27ae60';
      default: return '#6c757d';
    }
  }
}
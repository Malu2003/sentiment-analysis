import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sentiment-results',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sentiment-results-container" *ngIf="!loading">
      <div class="header">
        <h1>Sentiment Analysis Results</h1>
        <p class="target">Analysis for: <strong>{{ target }}</strong></p>
      </div>

      <div class="results-grid">
        <!-- Overall Sentiment Card -->
        <div class="result-card sentiment-card">
          <h3>Overall Sentiment</h3>
          <div class="sentiment-indicator" [ngClass]="results.overallSentiment">
            <span class="sentiment-emoji">{{ getSentimentEmoji(results.overallSentiment) }}</span>
            <span class="sentiment-text">{{ results.overallSentiment | titlecase }}</span>
          </div>
          <div class="confidence">
            <span>Confidence: {{ results.confidenceScore }}%</span>
            <div class="confidence-bar">
              <div class="confidence-fill" [style.width.%]="results.confidenceScore"></div>
            </div>
          </div>
        </div>

        <!-- Emotions Breakdown -->
        <div class="result-card emotions-card">
          <h3>Emotion Analysis</h3>
          <div class="emotions-grid">
            <div class="emotion" *ngFor="let emotion of getEmotionEntries()">
              <span class="emotion-name">{{ emotion.name | titlecase }}</span>
              <div class="emotion-bar">
                <div class="emotion-fill" [style.width.%]="emotion.value" [style.background-color]="getEmotionColor(emotion.name)"></div>
              </div>
              <span class="emotion-value">{{ emotion.value }}%</span>
            </div>
          </div>
        </div>

        <!-- Insights -->
        <div class="result-card insights-card">
          <h3>Key Insights</h3>
          <ul class="insights-list">
            <li *ngFor="let insight of results.insights" class="insight-item">
              <i class="insight-icon">💡</i>
              {{ insight }}
            </li>
          </ul>
        </div>

        <!-- Recommendations -->
        <div class="result-card recommendations-card">
          <h3>Recommendations</h3>
          <ul class="recommendations-list">
            <li *ngFor="let recommendation of results.recommendations" class="recommendation-item">
              <i class="recommendation-icon">📈</i>
              {{ recommendation }}
            </li>
          </ul>
        </div>
      </div>

      <div class="actions">
        <button class="btn secondary" (click)="analyzeAnother()">Analyze Another</button>
        <button class="btn primary" (click)="goHome()">Back to Home</button>
      </div>
    </div>

    <div class="loading-container" *ngIf="loading">
      <div class="spinner"></div>
      <p>Loading sentiment analysis results...</p>
    </div>
  `,
  styles: [`
    .sentiment-results-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .header {
      text-align: center;
      margin-bottom: 30px;
    }

    .target {
      font-size: 18px;
      color: #666;
    }

    .results-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .result-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border: 1px solid #e1e8ed;
    }

    .sentiment-indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin: 20px 0;
    }

    .sentiment-emoji {
      font-size: 48px;
    }

    .sentiment-text {
      font-size: 24px;
      font-weight: bold;
    }

    .sentiment-indicator.positive .sentiment-text { color: #27ae60; }
    .sentiment-indicator.negative .sentiment-text { color: #e74c3c; }
    .sentiment-indicator.neutral .sentiment-text { color: #f39c12; }

    .confidence-bar {
      width: 100%;
      height: 8px;
      background: #e1e8ed;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 5px;
    }

    .confidence-fill {
      height: 100%;
      background: linear-gradient(90deg, #3498db, #27ae60);
      transition: width 0.3s ease;
    }

    .emotions-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .emotion {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .emotion-name {
      width: 80px;
      font-weight: 500;
    }

    .emotion-bar {
      flex: 1;
      height: 20px;
      background: #e1e8ed;
      border-radius: 10px;
      overflow: hidden;
    }

    .emotion-fill {
      height: 100%;
      transition: width 0.3s ease;
    }

    .emotion-value {
      width: 40px;
      text-align: right;
      font-weight: bold;
    }

    .insights-list, .recommendations-list {
      list-style: none;
      padding: 0;
    }

    .insight-item, .recommendation-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin-bottom: 12px;
      padding: 8px;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .actions {
      display: flex;
      justify-content: center;
      gap: 15px;
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn.primary {
      background: #007bff;
      color: white;
    }

    .btn.secondary {
      background: #6c757d;
      color: white;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 400px;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #007bff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class SentimentResultsComponent implements OnInit {
  results: any = null;
  loading: boolean = true;
  target: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      const storedResult = localStorage.getItem('sentimentResult');
      const storedTarget = localStorage.getItem('sentimentTarget');
      
      if (storedResult) {
        try {
          this.results = JSON.parse(storedResult);
          this.target = storedTarget || 'Unknown';
          console.log('Sentiment results loaded:', this.results);
        } catch (error) {
          console.error('Error parsing sentiment results:', error);
          this.results = this.getMockResults();
        }
      } else {
        this.results = this.getMockResults();
      }
      
      this.loading = false;
    }, 1000);
  }

  getMockResults() {
    return {
      confidenceScore: 85,
      overallSentiment: 'positive',
      emotions: {
        joy: 65,
        sadness: 10,
        anger: 5,
        fear: 15,
        surprise: 25
      },
      insights: [
        "Strong positive sentiment detected across social platforms",
        "High engagement and enthusiasm in community discussions",
        "Users appreciate the innovative features and reliability"
      ],
      recommendations: [
        "Continue monitoring social sentiment to maintain positive perception",
        "Engage with community feedback to address minor concerns",
        "Leverage positive sentiment in marketing campaigns"
      ]
    };
  }

  getSentimentEmoji(sentiment: string): string {
    switch(sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😞';
      case 'neutral': return '😐';
      default: return '🤔';
    }
  }

  getEmotionEntries() {
    return Object.entries(this.results.emotions || {}).map(([name, value]) => ({
      name,
      value: value as number
    }));
  }

  getEmotionColor(emotion: string): string {
    const colors: {[key: string]: string} = {
      joy: '#f1c40f',
      sadness: '#3498db',
      anger: '#e74c3c',
      fear: '#9b59b6',
      surprise: '#e67e22'
    };
    return colors[emotion] || '#95a5a6';
  }

  analyzeAnother() {
    localStorage.removeItem('sentimentResult');
    localStorage.removeItem('sentimentTarget');
    this.router.navigate(['/sentiment']);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
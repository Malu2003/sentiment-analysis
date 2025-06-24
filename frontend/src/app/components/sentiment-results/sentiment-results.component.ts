import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sentiment-results',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="netflix-results-page" *ngIf="!loading">
      <!-- Hero Section with Main Result -->
      <div class="results-hero">
        <div class="hero-background"></div>
        <div class="hero-content">
          <div class="main-result">
            <h1 class="target-title">{{ target }}</h1>
            <div class="overall-sentiment" [ngClass]="results.overallSentiment">
              <span class="sentiment-emoji">{{ getSentimentEmoji(results.overallSentiment) }}</span>
              <span class="sentiment-text">{{ results.overallSentiment | titlecase }}</span>
              <div class="confidence-badge">{{ results.confidenceScore }}% Confident</div>
            </div>
            <p class="analysis-summary">
              Based on analysis of social media discussions across multiple platforms
            </p>
          </div>
        </div>
      </div>

      <!-- Content Sections -->
      <div class="content-container">
        <!-- Emotions Row -->
        <div class="content-row">
          <h2 class="row-title">Emotional Breakdown</h2>
          <div class="emotions-scroll">
            <div class="emotion-card" *ngFor="let emotion of getEmotionEntries()">
              <div class="emotion-visual">
                <div class="emotion-circle" [style.background]="getEmotionGradient(emotion.name)">
                  <span class="emotion-emoji">{{ getEmotionEmoji(emotion.name) }}</span>
                </div>
                <div class="emotion-bar">
                  <div class="emotion-fill" 
                       [style.width.%]="emotion.value"
                       [style.background]="getEmotionColor(emotion.name)">
                  </div>
                </div>
              </div>
              <h4>{{ emotion.name | titlecase }}</h4>
              <p>{{ emotion.value }}%</p>
            </div>
          </div>
        </div>

        <!-- Insights Row -->
        <div class="content-row">
          <h2 class="row-title">Key Insights</h2>
          <div class="insights-grid">
            <div class="insight-card" *ngFor="let insight of results.insights; let i = index">
              <div class="insight-number">{{ i + 1 }}</div>
              <div class="insight-content">
                <p>{{ insight }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recommendations Row -->
        <div class="content-row">
          <h2 class="row-title">Strategic Recommendations</h2>
          <div class="recommendations-grid">
            <div class="recommendation-card" *ngFor="let recommendation of results.recommendations">
              <div class="recommendation-icon">💡</div>
              <div class="recommendation-content">
                <p>{{ recommendation }}</p>
              </div>
              <div class="recommendation-action">
                <button class="action-btn">Learn More</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-section">
          <button class="netflix-btn primary" (click)="analyzeAnother()">
            🔄 Analyze Another
          </button>
          <button class="netflix-btn secondary" (click)="goHome()">
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div class="netflix-loading" *ngIf="loading">
      <div class="loading-content">
        <div class="netflix-spinner"></div>
        <h2>Analyzing Sentiment...</h2>
        <p>Processing data for <strong>{{ loadingTarget }}</strong></p>
      </div>
    </div>
  `,
  styles: [`
    .netflix-results-page {
      background: #141414;
      color: white;
      min-height: 100vh;
      padding-top: 60px;
    }

    .results-hero {
      position: relative;
      height: 50vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .hero-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(229, 9, 20, 0.2), rgba(0, 0, 0, 0.8)),
                  radial-gradient(circle at center, rgba(102, 126, 234, 0.1), transparent);
    }

    .hero-content {
      position: relative;
      z-index: 2;
      text-align: center;
      max-width: 800px;
      padding: 0 2rem;
    }

    .target-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      text-shadow: 2px 2px 8px rgba(0,0,0,0.8);
    }

    .overall-sentiment {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }

    .sentiment-emoji {
      font-size: 3rem;
    }

    .sentiment-text {
      font-size: 1.75rem;
      font-weight: 600;
    }

    .overall-sentiment.positive .sentiment-text { color: #4caf50; }
    .overall-sentiment.negative .sentiment-text { color: #f44336; }
    .overall-sentiment.neutral .sentiment-text { color: #ff9800; }

    .confidence-badge {
      background: rgba(229, 9, 20, 0.8);
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .analysis-summary {
      font-size: 1rem;
      color: #b3b3b3;
      line-height: 1.5;
    }

    .content-container {
      padding: 0 2rem 3rem;
    }

    .content-row {
      margin-bottom: 3rem;
    }

    .row-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: #ffffff;
    }

    .emotions-scroll {
      display: flex;
      gap: 1.5rem;
      overflow-x: auto;
      padding-bottom: 1rem;
    }

    .emotion-card {
      min-width: 160px;
      background: #222222;
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      transition: transform 0.3s ease;
    }

    .emotion-card:hover {
      transform: translateY(-5px);
    }

    .emotion-visual {
      margin-bottom: 1rem;
    }

    .emotion-circle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
    }

    .emotion-emoji {
      font-size: 1.8rem;
    }

    .emotion-bar {
      width: 100%;
      height: 6px;
      background: #333333;
      border-radius: 3px;
      overflow: hidden;
    }

    .emotion-fill {
      height: 100%;
      transition: width 0.8s ease;
    }

    .emotion-card h4 {
      font-size: 1rem;
      margin: 1rem 0 0.5rem;
    }

    .emotion-card p {
      font-size: 1.2rem;
      font-weight: bold;
      color: #ffffff;
    }

    .insights-grid, .recommendations-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .insight-card {
      background: #222222;
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }

    .insight-number {
      width: 32px;
      height: 32px;
      background: #e50914;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 0.9rem;
      flex-shrink: 0;
    }

    .insight-content p {
      font-size: 0.95rem;
      line-height: 1.6;
      margin: 0;
    }

    .recommendation-card {
      background: #222222;
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .recommendation-icon {
      font-size: 1.5rem;
    }

    .recommendation-content p {
      font-size: 0.95rem;
      line-height: 1.6;
      flex: 1;
    }

    .action-btn {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.85rem;
    }

    .action-btn:hover {
      background: rgba(229, 9, 20, 0.3);
      border-color: #e50914;
    }

    .action-section {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 3rem;
    }

    .netflix-btn {
      padding: 0.875rem 2rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .netflix-btn.primary {
      background: #e50914;
      color: white;
    }

    .netflix-btn.primary:hover {
      background: #f40612;
      transform: translateY(-2px);
    }

    .netflix-btn.secondary {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.3);
    }

    .netflix-btn.secondary:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);
    }

    .netflix-loading {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #141414;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }

    .loading-content {
      text-align: center;
    }

    .loading-content h2 {
      font-size: 1.5rem;
      margin: 1rem 0 0.5rem 0;
    }

    .loading-content p {
      font-size: 1rem;
      color: #b3b3b3;
    }

    .netflix-spinner {
      width: 50px;
      height: 50px;
      border: 4px solid rgba(229, 9, 20, 0.2);
      border-top: 4px solid #e50914;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1.5rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .content-container {
        padding: 0 1rem 2rem;
      }

      .target-title {
        font-size: 2rem;
      }

      .sentiment-emoji {
        font-size: 2.5rem;
      }

      .sentiment-text {
        font-size: 1.5rem;
      }

      .action-section {
        flex-direction: column;
        align-items: center;
      }

      .emotions-scroll {
        flex-direction: column;
      }

      .insights-grid, .recommendations-grid {
        grid-template-columns: 1fr;
      }

      .emotion-card {
        min-width: auto;
      }
    }

    @media (max-width: 480px) {
      .hero-content {
        padding: 0 1rem;
      }

      .target-title {
        font-size: 1.75rem;
      }

      .row-title {
        font-size: 1.25rem;
      }

      .netflix-btn {
        padding: 0.75rem 1.5rem;
        font-size: 0.9rem;
      }
    }
  `]
})
export class SentimentResultsComponent implements OnInit, OnDestroy {
  results: any = null;
  loading: boolean = true;
  target: string = '';
  loadingTarget: string = '';
  private routerSubscription?: Subscription;
  private storageKey = `sentiment_${Date.now()}`; 

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('🎭 SentimentResultsComponent initialized');
    
    // Listen to router events to detect new navigation
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        console.log('🔄 Navigation detected, reloading data...');
        this.loadResults();
      });

    // Initial load
    this.loadResults();
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private loadResults() {
    this.loading = true;
    
    // Get the latest target being analyzed
    const currentTarget = localStorage.getItem('sentimentTarget');
    if (currentTarget) {
      this.loadingTarget = currentTarget;
    }
    
    // Add a small delay to show loading state
    setTimeout(() => {
      const storedResult = localStorage.getItem('sentimentResult');
      const storedTarget = localStorage.getItem('sentimentTarget');
      
      console.log('📊 Loading stored result:', storedResult);
      console.log('🎯 Loading stored target:', storedTarget);
      
      if (storedResult && storedTarget) {
        try {
          this.results = JSON.parse(storedResult);
          this.target = storedTarget;
          console.log('✅ Successfully loaded results for:', this.target);
        } catch (error) {
          console.error('❌ Error parsing results:', error);
          this.results = this.getMockResults();
          this.target = 'Demo Target';
        }
      } else {
        console.log('📊 No stored results found, using mock data');
        this.results = this.getMockResults();
        this.target = 'Demo Target';
      }
      
      this.loading = false;
    }, 1500);
  }

  getMockResults() {
    return {
      confidenceScore: 87,
      overallSentiment: 'positive',
      emotions: {
        joy: 70,
        sadness: 8,
        anger: 12,
        fear: 15,
        surprise: 35
      },
      insights: [
        "Overwhelmingly positive sentiment across all platforms",
        "High emotional engagement with strong joy indicators",
        "Community shows genuine enthusiasm and support"
      ],
      recommendations: [
        "Leverage positive sentiment in upcoming marketing campaigns",
        "Engage more actively with the enthusiastic community",
        "Monitor sentiment during major announcements for optimal timing"
      ]
    };
  }

  getSentimentEmoji(sentiment: string): string {
    switch(sentiment?.toLowerCase()) {
      case 'positive': return '😊';
      case 'negative': return '😞';
      case 'neutral': return '😐';
      default: return '🤔';
    }
  }

  getEmotionEmoji(emotion: string): string {
    const emojis: {[key: string]: string} = {
      joy: '😊',
      sadness: '😢',
      anger: '😠',
      fear: '😨',
      surprise: '😲'
    };
    return emojis[emotion] || '😐';
  }

  getEmotionEntries() {
    if (!this.results?.emotions) return [];
    return Object.entries(this.results.emotions).map(([name, value]) => ({
      name,
      value: value as number
    }));
  }

  getEmotionColor(emotion: string): string {
    const colors: {[key: string]: string} = {
      joy: '#ffd700',
      sadness: '#4fc3f7',
      anger: '#f44336',
      fear: '#9c27b0',
      surprise: '#ff9800'
    };
    return colors[emotion] || '#9e9e9e';
  }

  getEmotionGradient(emotion: string): string {
    const gradients: {[key: string]: string} = {
      joy: 'linear-gradient(135deg, #ffd700, #ffb300)',
      sadness: 'linear-gradient(135deg, #4fc3f7, #2196f3)',
      anger: 'linear-gradient(135deg, #f44336, #d32f2f)',
      fear: 'linear-gradient(135deg, #9c27b0, #7b1fa2)',
      surprise: 'linear-gradient(135deg, #ff9800, #f57c00)'
    };
    return gradients[emotion] || 'linear-gradient(135deg, #9e9e9e, #757575)';
  }

  analyzeAnother() {
    // Clear old data before navigating
    localStorage.removeItem('sentimentResult');
    localStorage.removeItem('sentimentTarget');
    console.log('🧹 Cleared old data, navigating to new analysis...');
    this.router.navigate(['/sentiment']);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sentiment-form',
  standalone: true, 
  imports: [FormsModule, CommonModule, HttpClientModule],
  template: `
    <div class="netflix-sentiment-page">
      <div class="sentiment-hero">
        <div class="hero-background"></div>
        <div class="sentiment-form-container">
          <div class="form-header">
            <h1>🎬 Start Your Analysis</h1>
            <p class="subtitle">What story do you want to uncover today?</p>
          </div>
          
          <form (ngSubmit)="onSubmit()" class="netflix-form">
            <div class="input-group">
              <input
                type="text"
                id="target"
                [(ngModel)]="target"
                name="target"
                placeholder=" "
                required
                class="netflix-input"
                [class.filled]="target.length > 0"
              />
              <label for="target" class="netflix-label">Target Analysis</label>
              <div class="input-border"></div>
            </div>

            <div class="sources-section">
              <h3>Choose Your Data Sources</h3>
              <div class="sources-grid">
                <div class="source-card" 
                     [class.selected]="sources.reddit"
                     (click)="toggleSource('reddit')">
                  <div class="source-header">
                    <div class="source-icon reddit">🟠</div>
                    <div class="source-check">
                      <div class="checkmark" [class.visible]="sources.reddit">✓</div>
                    </div>
                  </div>
                  <div class="source-info">
                    <h4>Reddit</h4>
                    <p>Community discussions & opinions</p>
                    <span class="source-badge">High Engagement</span>
                  </div>
                </div>

                <div class="source-card" 
                     [class.selected]="sources.hackernews"
                     (click)="toggleSource('hackernews')">
                  <div class="source-header">
                    <div class="source-icon hackernews">🟡</div>
                    <div class="source-check">
                      <div class="checkmark" [class.visible]="sources.hackernews">✓</div>
                    </div>
                  </div>
                  <div class="source-info">
                    <h4>Hacker News</h4>
                    <p>Tech community insights</p>
                    <span class="source-badge">Tech Focus</span>
                  </div>
                </div>

                <div class="source-card" 
                     [class.selected]="sources.mastodon"
                     (click)="toggleSource('mastodon')">
                  <div class="source-header">
                    <div class="source-icon mastodon">🟣</div>
                    <div class="source-check">
                      <div class="checkmark" [class.visible]="sources.mastodon">✓</div>
                    </div>
                  </div>
                  <div class="source-info">
                    <h4>Mastodon</h4>
                    <p>Decentralized social network</p>
                    <span class="source-badge">Open Source</span>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" [disabled]="loading || !target.trim()" class="netflix-button">
              <span *ngIf="!loading" class="button-content">
                <span class="button-icon">▶️</span>
                <span class="button-text">Start Analysis</span>
              </span>
              <span *ngIf="loading" class="loading-content">
                <div class="spinner"></div>
                <span class="loading-text">Analyzing {{ target }}...</span>
              </span>
            </button>
          </form>

          <div class="quick-suggestions">
            <h4>Trending Now</h4>
            <div class="suggestion-chips">
              <span *ngFor="let suggestion of suggestions" 
                    class="suggestion-chip"
                    (click)="selectSuggestion(suggestion)">
                {{ suggestion }}
              </span>
            </div>
          </div>

          <div class="analysis-info">
            <div class="info-item">
              <span class="info-icon">⚡</span>
              <span>Real-time analysis</span>
            </div>
            <div class="info-item">
              <span class="info-icon">🤖</span>
              <span>AI-powered insights</span>
            </div>
            <div class="info-item">
              <span class="info-icon">📊</span>
              <span>Multi-platform data</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    * {
      box-sizing: border-box;
    }

    .netflix-sentiment-page {
      min-height: 100vh;
      background: #141414;
      color: white;
      padding-top: 60px;
      font-family: 'Helvetica Neue', Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .sentiment-hero {
      position: relative;
      width: 100%;
      max-width: 900px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - 60px);
    }

    .hero-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        linear-gradient(135deg, rgba(229, 9, 20, 0.15), rgba(0, 0, 0, 0.85)),
        radial-gradient(circle at 25% 25%, rgba(102, 126, 234, 0.1), transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(139, 69, 19, 0.1), transparent 50%);
      background-size: cover;
      border-radius: 16px;
    }

    .sentiment-form-container {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 500px;
      background: rgba(28, 28, 28, 0.95);
      border-radius: 16px;
      padding: 2rem;
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      margin: 0 auto;
    }

    .form-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .form-header h1 {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      background: linear-gradient(135deg, #e50914, #ff6b6b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.2;
    }

    .subtitle {
      font-size: 1rem;
      color: #b3b3b3;
      font-weight: 300;
      margin: 0;
      line-height: 1.4;
    }

    .netflix-form {
      margin-bottom: 1.5rem;
    }

    .input-group {
      position: relative;
      margin-bottom: 2rem;
    }

    .netflix-input {
      width: 100%;
      padding: 1rem 0.75rem 0.5rem;
      background: rgba(45, 45, 45, 0.8);
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: white;
      font-size: 1rem;
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      outline: none;
      display: block;
    }

    .netflix-input:focus,
    .netflix-input.filled {
      border-color: #e50914;
      background: rgba(45, 45, 45, 1);
      transform: translateY(-1px);
      box-shadow: 0 8px 20px rgba(229, 9, 20, 0.2);
    }

    .netflix-label {
      position: absolute;
      left: 0.75rem;
      top: 1rem;
      font-size: 0.875rem;
      color: #b3b3b3;
      font-weight: 500;
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      pointer-events: none;
    }

    .netflix-input:focus + .netflix-label,
    .netflix-input.filled + .netflix-label {
      top: 0.375rem;
      font-size: 0.75rem;
      color: #e50914;
      transform: translateY(-1px);
    }

    .input-border {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(135deg, #e50914, #ff6b6b);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    .netflix-input:focus ~ .input-border {
      transform: scaleX(1);
    }

    .sources-section {
      margin-bottom: 2rem;
    }

    .sources-section h3 {
      font-size: 1.125rem;
      margin: 0 0 1rem 0;
      color: #ffffff;
      font-weight: 600;
      text-align: center;
    }

    .sources-grid {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      align-items: stretch;
    }

    .source-card {
      background: rgba(42, 42, 42, 0.8);
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .source-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(229, 9, 20, 0.1), transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .source-card:hover {
      border-color: rgba(229, 9, 20, 0.5);
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }

    .source-card:hover::before {
      opacity: 1;
    }

    .source-card.selected {
      border-color: #e50914;
      background: rgba(229, 9, 20, 0.1);
      transform: translateY(-1px);
    }

    .source-card.selected::before {
      opacity: 1;
    }

    .source-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
      position: relative;
      z-index: 1;
    }

    .source-icon {
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
      flex-shrink: 0;
    }

    .source-check {
      width: 24px;
      height: 24px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      flex-shrink: 0;
    }

    .source-card.selected .source-check {
      border-color: #e50914;
      background: #e50914;
    }

    .checkmark {
      color: white;
      font-weight: bold;
      font-size: 0.75rem;
      opacity: 0;
      transform: scale(0.5);
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .checkmark.visible {
      opacity: 1;
      transform: scale(1);
    }

    .source-info {
      position: relative;
      z-index: 1;
      flex: 1;
    }

    .source-info h4 {
      font-size: 1rem;
      margin: 0 0 0.25rem 0;
      color: #ffffff;
      font-weight: 600;
    }

    .source-info p {
      color: #b3b3b3;
      margin: 0 0 0.5rem 0;
      font-size: 0.875rem;
      line-height: 1.4;
    }

    .source-badge {
      display: inline-block;
      background: rgba(229, 9, 20, 0.2);
      color: #ff6b6b;
      padding: 0.125rem 0.5rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
      border: 1px solid rgba(229, 9, 20, 0.3);
    }

    .netflix-button {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, #e50914, #b00710);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      position: relative;
      overflow: hidden;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;
    }

    .netflix-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
    }

    .netflix-button:hover:not(:disabled) {
      background: linear-gradient(135deg, #f40612, #e50914);
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(229, 9, 20, 0.3);
    }

    .netflix-button:hover:not(:disabled)::before {
      left: 100%;
    }

    .netflix-button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .button-content,
    .loading-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .button-icon {
      font-size: 1rem;
    }

    .spinner {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .quick-suggestions {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .quick-suggestions h4 {
      font-size: 0.875rem;
      color: #b3b3b3;
      margin: 0 0 0.75rem 0;
      font-weight: 500;
    }

    .suggestion-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
      align-items: center;
    }

    .suggestion-chip {
      background: rgba(255, 255, 255, 0.1);
      padding: 0.375rem 0.75rem;
      border-radius: 16px;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.2);
      white-space: nowrap;
    }

    .suggestion-chip:hover {
      background: rgba(229, 9, 20, 0.3);
      border-color: #e50914;
      transform: translateY(-1px);
    }

    .analysis-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      gap: 0.75rem;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.375rem;
      font-size: 0.8rem;
      color: #b3b3b3;
      flex: 1;
      text-align: center;
    }

    .info-icon {
      font-size: 1.125rem;
      display: block;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .netflix-sentiment-page {
        padding-top: 40px;
      }

      .sentiment-hero {
        padding: 1rem;
      }

      .sentiment-form-container {
        padding: 1.5rem;
        max-width: 100%;
      }

      .form-header h1 {
        font-size: 1.5rem;
      }

      .subtitle {
        font-size: 0.9rem;
      }

      .analysis-info {
        flex-direction: column;
        gap: 1rem;
        align-items: center;
      }

      .info-item {
        flex-direction: row;
        justify-content: center;
        gap: 0.5rem;
      }

      .suggestion-chips {
        gap: 0.375rem;
      }

      .netflix-input {
        font-size: 0.9rem;
        padding: 0.875rem 0.75rem 0.5rem;
      }

      .sources-grid {
        gap: 0.5rem;
      }
    }

    @media (max-width: 480px) {
      .sentiment-form-container {
        padding: 1rem;
        margin: 0.5rem;
      }

      .form-header h1 {
        font-size: 1.375rem;
      }

      .subtitle {
        font-size: 0.875rem;
      }

      .netflix-button {
        padding: 0.875rem;
        font-size: 0.9rem;
      }

      .source-card {
        padding: 0.75rem;
      }

      .suggestion-chips {
        flex-direction: column;
        align-items: stretch;
      }

      .suggestion-chip {
        text-align: center;
      }
    }

    /* Landscape mobile optimization */
    @media (max-height: 600px) and (orientation: landscape) {
      .netflix-sentiment-page {
        padding-top: 10px;
      }

      .sentiment-hero {
        min-height: auto;
        padding: 1rem;
      }

      .sentiment-form-container {
        padding: 1.5rem;
      }

      .form-header {
        margin-bottom: 1rem;
      }

      .form-header h1 {
        font-size: 1.375rem;
        margin-bottom: 0.25rem;
      }

      .subtitle {
        font-size: 0.875rem;
      }
    }
  `]
})
export class SentimentComponent implements OnInit {
  target: string = '';
  sources = {
    reddit: true,
    hackernews: true,
    mastodon: false
  };
  loading: boolean = false;

  suggestions = [
    'Tesla', 'iPhone 15', 'Bitcoin', 'Netflix', 'React', 'OpenAI', 
    'Instagram', 'TikTok', 'BTS', 'PlayStation 5', 'ChatGPT', 'Meta'
  ];

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Clear any existing data when component loads
    localStorage.removeItem('sentimentResult');
    localStorage.removeItem('sentimentTarget');
    localStorage.removeItem('sentimentTimestamp');
    
    // Check for query params (from category clicks)
    this.route.queryParams.subscribe(params => {
      if (params['target']) {
        this.target = params['target'];
      }
    });
  }

  toggleSource(source: 'reddit' | 'hackernews' | 'mastodon') {
    this.sources[source] = !this.sources[source];
  }

  selectSuggestion(suggestion: string) {
    this.target = suggestion;
  }

  onSubmit() {
    console.log('🎯 Starting sentiment analysis for:', this.target);
    
    if (!this.target.trim()) {
      alert('Please enter a target for analysis');
      return;
    }

    // Clear any existing results before starting new analysis
    localStorage.removeItem('sentimentResult');
    localStorage.removeItem('sentimentTarget');
    localStorage.removeItem('sentimentTimestamp');
    
    this.loading = true;

    const selectedSources = Object.keys(this.sources)
      .filter(key => this.sources[key as keyof typeof this.sources]);

    if (selectedSources.length === 0) {
      alert('Please select at least one data source');
      this.loading = false;
      return;
    }

    const payload = {
      target: this.target,
      sources: selectedSources
    };

    console.log('📤 Sending payload:', payload);

    this.http.post('http://localhost:3000/api/sentiment/analyze', payload)
      .subscribe({
        next: (response: any) => {
          console.log('✅ Sentiment analysis response:', response);
          
          // Store fresh results with timestamp
          const timestamp = Date.now();
          localStorage.setItem('sentimentResult', JSON.stringify(response.data));
          localStorage.setItem('sentimentTarget', this.target);
          localStorage.setItem('sentimentTimestamp', timestamp.toString());
          
          console.log('💾 Fresh data stored for:', this.target, 'at', timestamp);
          
          // Navigate with query param to force refresh
          this.router.navigate(['/sentiment-results'], {
            queryParams: { t: timestamp }
          }).then(success => {
            console.log(success ? '✅ Navigation successful' : '❌ Navigation failed');
            this.loading = false;
          });
        },
        error: (error) => {
          console.error('❌ Sentiment analysis error:', error);
          alert('Analysis failed. Please try again.');
          this.loading = false;
        }
      });
  }
}
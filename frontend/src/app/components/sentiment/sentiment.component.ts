import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SentimentResultsComponent } from '../sentiment-results/sentiment-results.component';

@Component({
  selector: 'app-sentiment-form',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule,SentimentResultsComponent],
  template: `
    <div class="sentiment-form-container">
      <h2>Sentiment Analysis</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="target">Target (Brand/Product/Topic):</label>
          <input
            type="text"
            id="target"
            [(ngModel)]="target"
            name="target"
            placeholder="e.g., Tesla, iPhone, React"
            required
          />
        </div>

        <div class="form-group">
          <label>Data Sources:</label>
          <div class="checkbox-group">
            <label>
              <input
                type="checkbox"
                [(ngModel)]="sources.reddit"
                name="reddit"
              />
              Reddit
            </label>
            <label>
              <input
                type="checkbox"
                [(ngModel)]="sources.hackernews"
                name="hackernews"
              />
              Hacker News
            </label>
            <label>
              <input
                type="checkbox"
                [(ngModel)]="sources.mastodon"
                name="mastodon"
              />
              Mastodon
            </label>
          </div>
        </div>

        <button type="submit" [disabled]="loading" class="submit-btn">
          {{ loading ? 'Analyzing...' : 'Analyze Sentiment' }}
        </button>
      </form>
    </div>
    <app-sentiment-results></app-sentiment-results>
  `,
  styles: [`
    .sentiment-form-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    .checkbox-group {
      display: flex;
      gap: 15px;
    }
    .submit-btn {
      background: #007bff;
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  `]
})
export class SentimentComponent {
  target: string = '';
  sources = {
    reddit: true,
    hackernews: true,
    mastodon: false
  };
  loading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}


// ...existing code...

onSubmit() {
  console.log('🎯 Starting sentiment analysis for:', this.target);
  
  if (!this.target.trim()) {
    alert('Please enter a target for analysis');
    return;
  }

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
        
        // Store the results properly
        localStorage.setItem('sentimentResult', JSON.stringify(response.data));
        localStorage.setItem('sentimentTarget', this.target);
        
        console.log('💾 Data stored in localStorage');
        console.log('🚀 Navigating to sentiment-results...');
        
        // Navigate to sentiment results
        this.router.navigate(['/sentiment-results']).then(success => {
          if (success) {
            console.log('✅ Navigation successful');
          } else {
            console.error('❌ Navigation failed');
          }
        });
        
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Sentiment analysis error:', error);
        alert('Analysis failed. Please try again.');
        this.loading = false;
      }
    });
}

}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <div class="hero-section">
        <h1>🎭 Sentiment Analysis Tool</h1>
        <p class="subtitle">Analyze public sentiment about any topic, brand, or product using AI-powered social media monitoring</p>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h3>Multi-Platform Analysis</h3>
            <p>Collect data from Reddit, Hacker News, and Mastodon</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🤖</div>
            <h3>AI-Powered Insights</h3>
            <p>Advanced sentiment analysis using Google Gemini AI</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">💡</div>
            <h3>Actionable Recommendations</h3>
            <p>Get specific insights and recommendations for your brand</p>
          </div>
        </div>
        
        <button class="cta-button" (click)="startAnalysis()">
          🚀 Start Sentiment Analysis
        </button>
      </div>
      
      <div class="how-it-works">
        <h2>How It Works</h2>
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <h4>Enter Target</h4>
            <p>Type in any brand, product, or topic you want to analyze</p>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <h4>Select Sources</h4>
            <p>Choose which social media platforms to analyze</p>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <h4>Get Insights</h4>
            <p>Receive detailed sentiment analysis and recommendations</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .hero-section {
      text-align: center;
      padding: 60px 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 20px;
      color: white;
      margin-bottom: 60px;
    }

    .hero-section h1 {
      font-size: 3.5em;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .subtitle {
      font-size: 1.3em;
      margin-bottom: 40px;
      opacity: 0.9;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      margin: 50px 0;
      max-width: 900px;
      margin-left: auto;
      margin-right: auto;
    }

    .feature-card {
      background: rgba(255, 255, 255, 0.1);
      padding: 30px;
      border-radius: 15px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .feature-icon {
      font-size: 3em;
      margin-bottom: 15px;
    }

    .feature-card h3 {
      margin-bottom: 15px;
      font-size: 1.3em;
    }

    .cta-button {
      background: #ff6b6b;
      color: white;
      border: none;
      padding: 20px 40px;
      font-size: 1.2em;
      border-radius: 50px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s ease;
      box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
    }

    .cta-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 40px rgba(255, 107, 107, 0.4);
    }

    .how-it-works {
      text-align: center;
      padding: 60px 0;
    }

    .how-it-works h2 {
      font-size: 2.5em;
      margin-bottom: 50px;
      color: #2c3e50;
    }

    .steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 40px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .step {
      background: white;
      padding: 40px 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .step:hover {
      transform: translateY(-5px);
    }

    .step-number {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5em;
      font-weight: bold;
      margin: 0 auto 20px;
    }

    .step h4 {
      font-size: 1.4em;
      margin-bottom: 15px;
      color: #2c3e50;
    }

    .step p {
      color: #7f8c8d;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .hero-section h1 {
        font-size: 2.5em;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
      }
      
      .steps {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  startAnalysis() {
    this.router.navigate(['/sentiment']);
  }
}
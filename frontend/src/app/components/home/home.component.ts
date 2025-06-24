import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="netflix-home-page">
      <!-- Hero Section -->
      <div class="home-hero">
        <div class="hero-background"></div>
        <div class="hero-content">
          <h1>🎭 Sentiment Analysis Tool</h1>
          <p class="subtitle">Analyze public sentiment about any topic, brand, or product using AI-powered social media monitoring</p>
          
          <div class="features-showcase">
            <div class="feature-item">
              <span class="feature-icon">📊</span>
              <span class="feature-text">Multi-Platform</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🤖</span>
              <span class="feature-text">AI-Powered</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">💡</span>
              <span class="feature-text">Actionable Insights</span>
            </div>
          </div>
          
          <button class="netflix-cta-button" (click)="startAnalysis()">
            <span class="button-icon">🚀</span>
            <span class="button-text">Start Sentiment Analysis</span>
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="content-container">
        <!-- Features Section -->
        <div class="content-row">
          <h2 class="section-title">Why Choose Our Platform?</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-header">
                <div class="feature-icon-large">📊</div>
                <h3>Multi-Platform Analysis</h3>
              </div>
              <p>Collect comprehensive data from Reddit, Hacker News, and Mastodon to get a complete picture of public sentiment</p>
              <div class="feature-badge">Real-time Data</div>
            </div>
            
            <div class="feature-card">
              <div class="feature-header">
                <div class="feature-icon-large">🤖</div>
                <h3>AI-Powered Insights</h3>
              </div>
              <p>Advanced sentiment analysis powered by Google Gemini AI delivers accurate emotional understanding and trends</p>
              <div class="feature-badge">Advanced AI</div>
            </div>
            
            <div class="feature-card">
              <div class="feature-header">
                <div class="feature-icon-large">💡</div>
                <h3>Actionable Recommendations</h3>
              </div>
              <p>Get specific, strategic insights and actionable recommendations tailored to your brand or topic</p>
              <div class="feature-badge">Strategic Guidance</div>
            </div>
          </div>
        </div>

        <!-- How It Works Section -->
        <div class="content-row">
          <h2 class="section-title">How It Works</h2>
          <div class="steps-container">
            <div class="step-card">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>Enter Your Target</h4>
                <p>Type in any brand, product, person, or topic you want to analyze for public sentiment</p>
              </div>
            </div>
            
            <div class="step-connector"></div>
            
            <div class="step-card">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>Select Data Sources</h4>
                <p>Choose which social media platforms to analyze based on your target audience</p>
              </div>
            </div>
            
            <div class="step-connector"></div>
            
            <div class="step-card">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>Get Deep Insights</h4>
                <p>Receive detailed sentiment analysis, emotional breakdown, and strategic recommendations</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Call to Action Section -->
        <div class="cta-section">
          <div class="cta-content">
            <h2>Ready to Understand Public Sentiment?</h2>
            <p>Join thousands of brands using our AI-powered sentiment analysis to make data-driven decisions</p>
            <button class="netflix-cta-button large" (click)="startAnalysis()">
              <span class="button-icon">🎯</span>
              <span class="button-text">Start Your First Analysis</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .netflix-home-page {
      background: #141414;
      color: white;
      min-height: 100vh;
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }

    .home-hero {
      position: relative;
      height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .hero-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        linear-gradient(135deg, rgba(229, 9, 20, 0.2), rgba(0, 0, 0, 0.8)),
        radial-gradient(circle at 25% 25%, rgba(102, 126, 234, 0.15), transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(139, 69, 19, 0.1), transparent 50%),
        linear-gradient(45deg, rgba(229, 9, 20, 0.1), transparent 40%);
      background-size: cover;
    }

    .hero-content {
      position: relative;
      z-index: 2;
      text-align: center;
      max-width: 800px;
      padding: 0 2rem;
    }

    .hero-content h1 {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      background: linear-gradient(135deg, #e50914, #ff6b6b, #ffd700);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 2px 2px 8px rgba(0,0,0,0.3);
      line-height: 1.2;
    }

    .subtitle {
      font-size: 1.25rem;
      color: #b3b3b3;
      font-weight: 300;
      margin-bottom: 2.5rem;
      line-height: 1.5;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .features-showcase {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }

    .feature-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }

    .feature-item:hover {
      background: rgba(229, 9, 20, 0.1);
      border-color: rgba(229, 9, 20, 0.3);
      transform: translateY(-2px);
    }

    .feature-item .feature-icon {
      font-size: 1.5rem;
    }

    .feature-item .feature-text {
      font-size: 0.875rem;
      font-weight: 500;
      white-space: nowrap;
    }

    .netflix-cta-button {
      background: linear-gradient(135deg, #e50914, #b00710);
      color: white;
      border: none;
      padding: 1rem 2.5rem;
      border-radius: 8px;
      font-size: 1.125rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
    }

    .netflix-cta-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
    }

    .netflix-cta-button:hover {
      background: linear-gradient(135deg, #f40612, #e50914);
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(229, 9, 20, 0.4);
    }

    .netflix-cta-button:hover::before {
      left: 100%;
    }

    .netflix-cta-button.large {
      padding: 1.25rem 3rem;
      font-size: 1.25rem;
    }

    .button-icon {
      font-size: 1.125rem;
    }

    .content-container {
      padding: 0 2rem 4rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .content-row {
      margin-bottom: 4rem;
    }

    .section-title {
      font-size: 2rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 3rem;
      color: #ffffff;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      background: rgba(28, 28, 28, 0.9);
      border-radius: 16px;
      padding: 2rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .feature-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(229, 9, 20, 0.05), transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .feature-card:hover {
      border-color: rgba(229, 9, 20, 0.3);
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }

    .feature-card:hover::before {
      opacity: 1;
    }

    .feature-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      position: relative;
      z-index: 1;
    }

    .feature-icon-large {
      font-size: 2rem;
      width: 60px;
      height: 60px;
      background: rgba(229, 9, 20, 0.1);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(229, 9, 20, 0.2);
    }

    .feature-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
      color: #ffffff;
    }

    .feature-card p {
      color: #b3b3b3;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      position: relative;
      z-index: 1;
    }

    .feature-badge {
      display: inline-block;
      background: rgba(229, 9, 20, 0.2);
      color: #ff6b6b;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
      border: 1px solid rgba(229, 9, 20, 0.3);
      position: relative;
      z-index: 1;
    }

    .steps-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      max-width: 1000px;
      margin: 0 auto;
    }

    .step-card {
      background: rgba(28, 28, 28, 0.9);
      border-radius: 16px;
      padding: 2rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      text-align: center;
      flex: 1;
      max-width: 280px;
      transition: all 0.3s ease;
    }

    .step-card:hover {
      border-color: rgba(229, 9, 20, 0.3);
      transform: translateY(-5px);
    }

    .step-number {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #e50914, #b00710);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      font-weight: bold;
      margin: 0 auto 1.5rem;
    }

    .step-content h4 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #ffffff;
    }

    .step-content p {
      color: #b3b3b3;
      line-height: 1.5;
      font-size: 0.9rem;
    }

    .step-connector {
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, rgba(229, 9, 20, 0.3), rgba(229, 9, 20, 0.1));
      flex-shrink: 0;
    }

    .cta-section {
      background: rgba(28, 28, 28, 0.6);
      border-radius: 20px;
      padding: 4rem 2rem;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
    }

    .cta-content h2 {
      font-size: 2.25rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #ffffff;
    }

    .cta-content p {
      font-size: 1.125rem;
      color: #b3b3b3;
      margin-bottom: 2.5rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2.5rem;
      }

      .subtitle {
        font-size: 1.125rem;
      }

      .features-showcase {
        gap: 1rem;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }

      .steps-container {
        flex-direction: column;
        gap: 1.5rem;
      }

      .step-connector {
        width: 2px;
        height: 30px;
        background: linear-gradient(180deg, rgba(229, 9, 20, 0.3), rgba(229, 9, 20, 0.1));
      }

      .content-container {
        padding: 0 1rem 3rem;
      }

      .cta-section {
        padding: 3rem 1.5rem;
      }

      .cta-content h2 {
        font-size: 1.75rem;
      }

      .section-title {
        font-size: 1.75rem;
      }
    }

    @media (max-width: 480px) {
      .hero-content h1 {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1rem;
      }

      .features-showcase {
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
      }

      .netflix-cta-button {
        padding: 0.875rem 2rem;
        font-size: 1rem;
      }

      .netflix-cta-button.large {
        padding: 1rem 2.5rem;
        font-size: 1.125rem;
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
import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sentiment-analysis-tool';

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }

  goToSentiment() {
    this.router.navigate(['/sentiment']);
  }
}
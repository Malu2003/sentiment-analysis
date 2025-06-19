import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Remove NgModel from import
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume-form',
  imports: [FormsModule, CommonModule,HttpClientModule],
  standalone: true,
  templateUrl: './resume-form.component.html',
  styleUrl: './resume-form.component.css'
})
export class ResumeFormComponent implements OnInit {
  jobDescription: string = '';
  resumeFile: File | null = null;
  
  constructor(private router: Router, private http: HttpClient) {}
   ngOnInit() {
    console.log('ResumeFormComponent loaded'); // Debug line
  }
  onFileSelected(event: any) {
    this.resumeFile = event.target.files[0];
    console.log('File selected:', this.resumeFile);
  }

  onSubmit() {
    console.log('Form submitted');
    if (!this.resumeFile || !this.jobDescription) {
      alert('Please provide both resume and job description.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', this.resumeFile);
    formData.append('jobDescription', this.jobDescription);

    this.http.post('http://localhost:3000/api/resume/match-resume', formData).subscribe(
      (response: any) => {
         console.log('Full backend response:', response);
      
      // Your backend returns: { success: true, data: {...}, message: "..." }
      // Store response.data (not the whole response)
      localStorage.setItem('result', JSON.stringify(response.data));
      this.router.navigate(['/results']);
    },
      (error) => {
        alert('Something went wrong. Please try again later.');
        console.error(error);
      }
    );
  }
}
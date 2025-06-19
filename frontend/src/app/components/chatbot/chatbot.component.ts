import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface ChatMessage {
  type: 'user' | 'bot';
  content: string;
  suggestions?: string[];
  followUpQuestions?: string[];
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  @Input() resumeText: string = '';
  @Input() jobDescription: string = '';
  @Input() analysisResult: any = null;

  messages: ChatMessage[] = [];
  currentQuestion: string = '';
  isLoading: boolean = false;
  isChatOpen: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Initial welcome message
    this.messages = [
      {
        type: 'bot',
        content: "Hi! I'm your resume assistant. I've analyzed your resume and I'm here to help answer any questions you have about the results. What would you like to know?",
        followUpQuestions: [
          "Why did I get this match score?",
          "How can I improve my resume?",
          "What skills should I focus on learning?",
          "Can you explain the missing keywords?"
        ],
        timestamp: new Date()
      }
    ];
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  async sendMessage(question: string) {
    if (!question.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      type: 'user',
      content: question,
      timestamp: new Date()
    };
    this.messages.push(userMessage);
    this.currentQuestion = '';
    this.isLoading = true;

    try {
       const response = await this.http.post<any>('http://localhost:3000/api/resume/chat', {
      question,
      resumeText: this.resumeText,
      jobDescription: this.jobDescription,
      analysisResult: this.analysisResult
    }).toPromise();

      if (response.success) {
        const botMessage: ChatMessage = {
          type: 'bot',
          content: response.data.response,
          suggestions: response.data.suggestions,
          followUpQuestions: response.data.followUpQuestions,
          timestamp: new Date()
        };
        this.messages.push(botMessage);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        type: 'bot',
        content: "I'm sorry, I'm having trouble processing your question right now. Could you please try again?",
        timestamp: new Date()
      };
      this.messages.push(errorMessage);
    } finally {
      this.isLoading = false;
    }
  }

  handleQuickQuestion(question: string) {
    this.sendMessage(question);
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage(this.currentQuestion);
    }
  }
}
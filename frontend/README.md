🎯 Resume Screening Tool with AI Chatbot
A powerful, AI-driven resume analysis tool that helps job seekers optimize their resumes for better job matches. Built with Angular, NestJS, and Google's Gemini AI.

<img alt="Resume Screening Tool" src="https://img.shields.io/badge/Status-Active-brightgreen">
<img alt="Angular" src="https://img.shields.io/badge/Angular-17+-red">
<img alt="NestJS" src="https://img.shields.io/badge/NestJS-10+-ea2845">
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5+-blue">
<img alt="AI Powered" src="https://img.shields.io/badge/AI-Gemini AI-orange">
✨ Features
🔍 Smart Resume Analysis
AI-Powered Matching: Uses Google Gemini AI for intelligent resume-job matching
Match Score Calculation: Get a precise compatibility score (0-100%)
Keyword Analysis: Identifies matched and missing keywords
Strengths & Improvements: Detailed feedback on resume strengths and areas for improvement
💬 Interactive AI Chatbot
Personalized Advice: Ask specific questions about your resume analysis
Real-time Responses: Get instant, contextual career advice
Follow-up Questions: Smart suggestions for deeper insights
Resume Optimization Tips: Actionable recommendations for improvement
📊 Comprehensive Analytics
Visual Match Score: Color-coded scoring system
Detailed Breakdown: Technical skills, experience, and qualifications analysis
Priority Recommendations: High/Medium/Low priority improvement suggestions
Professional Insights: Industry-standard resume optimization advice
🎨 Modern UI/UX
Responsive Design: Works perfectly on desktop and mobile
Intuitive Interface: Clean, user-friendly design
Real-time Loading: Smooth animations and progress indicators
Accessibility: WCAG compliant design
🚀 Quick Start
Prerequisites
Node.js (v18+ recommended)
npm or yarn
Google Gemini API Key
1. Clone the Repository
cd backend
npm install

# Create environment file
cp .env.example .env
# Add your Gemini API key to .env file
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
2. Backend Setup
cd backend
npm install

# Create environment file
cp .env.example .env
# Add your Gemini API key to .env file
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
3. Frontend Setup
cd ../frontend
npm install
4. Start the Application
# Terminal 1: Start Backend
cd backend
npm run start:dev

# Terminal 2: Start Frontend
cd frontend
ng serve

5. Open Your Browser
Navigate to http://localhost:4200

🛠️ Technology Stack
Frontend
Angular 17+: Modern web framework
TypeScript: Type-safe JavaScript
Bootstrap/CSS3: Responsive styling
RxJS: Reactive programming
Backend
NestJS: Progressive Node.js framework
TypeScript: Server-side type safety
Express: Web application framework
Multer: File upload handling
AI & APIs
Google Gemini AI: Advanced language model
File Processing: PDF/DOC resume parsing
RESTful APIs: Clean API architecture

📁 Project Structure
resume-screening-tool/
├── frontend/                 # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── resume-form/     # File upload component
│   │   │   │   ├── results/         # Analysis results display
│   │   │   │   └── chatbot/         # AI chatbot interface
│   │   │   ├── services/            # Angular services
│   │   │   └── models/              # TypeScript interfaces
│   │   └── assets/                  # Static assets
│   └── package.json
├── backend/                  # NestJS application
│   ├── src/
│   │   ├── resume/                  # Resume analysis module
│   │   │   ├── resume.controller.ts
│   │   │   ├── resume.service.ts
│   │   │   └── resume.module.ts
│   │   ├── services/
│   │   │   └── ai.service.ts        # Gemini AI integration
│   │   └── utils/
│   │       └── file-parser.util.ts  # File processing utilities
│   └── package.json
└── README.md

💡 Usage Examples
1. Upload Resume
Select your resume file (PDF, DOC, DOCX)
Paste the job description
Click "Analyze Resume"
2. View Results
Get detailed match score and analysis
Review strengths and improvement areas
Check keyword analysis
3. Chat with AI
Click "💬 Ask Questions" button
Ask specific questions like:
"Why did I get this match score?"
"How can I improve my technical skills?"
"What should I focus on first?"

🤝 Contributing
Fork the repository
Create feature branch: git checkout -b feature/amazing-feature
Commit changes: git commit -m 'Add amazing feature'
Push to branch: git push origin feature/amazing-feature
Open Pull Request

🙏 Acknowledgments
Google Gemini AI for powerful language processing
NestJS for excellent backend framework
Angular for robust frontend development
Open Source Community for inspiration and tools

⭐ Star this repo if it helped you!
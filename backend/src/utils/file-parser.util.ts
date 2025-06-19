import * as pdf from 'pdf-parse';

export class FileParserUtil {
  static async parseFile(buffer: Buffer, filename: string): Promise<string> {
    const fileExtension = filename.split('.').pop()?.toLowerCase();
    
    try {
      console.log(`Parsing file: ${filename} (${fileExtension})`);
      
      switch (fileExtension) {
        case 'pdf':
          return await this.parsePDF(buffer);
        case 'txt':
          return buffer.toString('utf-8');
        case 'doc':
        case 'docx':
          // For now, return mock content for DOC files
          // In production, you'd use a library like 'mammoth' for DOCX parsing
          return this.getMockResumeContent(filename);
        default:
          throw new Error(`Unsupported file format: ${fileExtension}. Please upload PDF, DOC, or DOCX files.`);
      }
    } catch (error) {
      console.error('File parsing error:', error);
      throw new Error(`Failed to parse file: ${error.message}`);
    }
  }

  private static async parsePDF(buffer: Buffer): Promise<string> {
    try {
      console.log('Parsing PDF...');
      const data = await pdf(buffer);
      
      if (!data.text || data.text.trim().length < 20) {
        throw new Error('PDF appears to be empty, contains only images, or is unreadable. Please ensure your PDF contains selectable text.');
      }
      
      console.log('PDF parsed successfully, extracted text length:', data.text.length);
      return data.text;
    } catch (error) {
      throw new Error(`PDF parsing failed: ${error.message}`);
    }
  }

  private static getMockResumeContent(filename: string): string {
    // Temporary mock content for non-PDF files
    // This provides realistic resume content for testing
    return `
John Doe
Software Developer

EXPERIENCE:
Software Developer at Tech Company (2021-2024)
- Developed web applications using JavaScript, React, and Node.js
- Built REST APIs with Express.js and MongoDB
- Collaborated with cross-functional teams using Agile methodology
- Increased application performance by 30% through optimization
- Led a team of 3 junior developers on multiple projects

Frontend Developer at StartupXYZ (2019-2021)
- Created responsive web interfaces using HTML, CSS, and JavaScript
- Implemented modern frameworks including React and Vue.js
- Worked with Git version control and CI/CD pipelines
- Improved user experience resulting in 25% increase in user engagement

EDUCATION:
Bachelor of Science in Computer Science
University of Technology (2015-2019)
- Relevant coursework: Data Structures, Algorithms, Database Systems
- GPA: 3.7/4.0

SKILLS:
Programming Languages: JavaScript, Python, Java, TypeScript
Frontend: React, Angular, Vue.js, HTML, CSS, Bootstrap
Backend: Node.js, Express, Django, Spring Boot
Databases: MongoDB, PostgreSQL, MySQL
Tools: Git, Docker, Jenkins, AWS, Azure
Methodologies: Agile, Scrum, Test-Driven Development

PROJECTS:
E-commerce Platform (2023)
- Built full-stack web application using React and Node.js
- Integrated payment processing and user authentication
- Deployed on AWS with Docker containers

Task Management App (2022)
- Developed mobile-responsive web app with Vue.js
- Implemented real-time updates using WebSocket
- Used MongoDB for data persistence

CERTIFICATIONS:
- AWS Certified Developer Associate (2023)
- Google Cloud Professional Developer (2022)

Note: This is sample content from ${filename}. In production, actual file parsing would be implemented.
    `.trim();
  }
}
import { NextResponse } from 'next/server';

// Knowledge base about the portfolio owner
const PERSONAL_KNOWLEDGE_BASE = {
  name: 'Alex Chen',
  role: 'Senior Full-Stack Developer',
  location: 'San Francisco, CA',
  experience: '6+ years',
  skills: [
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'AWS',
    'Three.js',
    'AI Integration',
    'Supabase',
    'Tailwind CSS',
  ],
  currentFocus: 'Building modern web applications with AI integration and 3D experiences',
  availability: 'Available for consulting and project collaborations',
  email: 'hello@example.com',
  github: 'https://github.com/username',
  linkedin: 'https://linkedin.com/in/username',
};

// Common questions and answers
const FAQ_RESPONSES = {
  greeting: "Hello! I'm Alex's AI assistant. I can tell you about Alex's skills, experience, projects, and availability. What would you like to know?",
  skills: `Alex specializes in:
- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Node.js, PostgreSQL, Supabase, REST/GraphQL APIs
- DevOps: AWS, Docker, CI/CD
- Emerging Tech: Three.js (3D web), AI integration (Claude/OpenAI APIs)
- Design: UI/UX, responsive design, accessibility

He has ${PERSONAL_KNOWLEDGE_BASE.experience} of professional experience.`,
  experience: `Professional Experience:
- Senior Full-Stack Developer at Tech Innovations Inc. (2024-Present)
- Frontend Engineer at Digital Solutions Co. (2022-2024)
- Software Developer at Startup Labs (2020-2022)

Education:
- MSc in Computer Science, Stanford University (2018-2020)
- BSc in Software Engineering, MIT (2014-2018)`,
  projects: `Featured Projects:
1. Real-Time Analytics Dashboard - Next.js, Supabase, Recharts
2. AI-Powered Content Assistant - React, Claude API, Node.js
3. 3D Portfolio Experience - Three.js, React Three Fiber

Check the Projects page for detailed information and live demos.`,
  contact: `You can contact Alex through:
- Email: ${PERSONAL_KNOWLEDGE_BASE.email}
- Contact Form: On the Contact page of this website
- LinkedIn: ${PERSONAL_KNOWLEDGE_BASE.linkedin}
- GitHub: ${PERSONAL_KNOWLEDGE_BASE.github}

He's available for meetings Mon-Fri, 9AM-6PM PST.`,
  availability: `Alex is currently available for:
- Consulting projects
- Speaking engagements
- Open source collaborations
- Technical advising

Typical response time: 24 hours on weekdays.`,
};

// Extract intent from user message
function getIntent(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return 'greeting';
  }

  if (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('stack')) {
    return 'skills';
  }

  if (lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('work')) {
    return 'experience';
  }

  if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
    return 'projects';
  }

  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
    return 'contact';
  }

  if (lowerMessage.includes('available') || lowerMessage.includes('hire') || lowerMessage.includes('collaborat')) {
    return 'availability';
  }

  if (lowerMessage.includes('blog') || lowerMessage.includes('article') || lowerMessage.includes('write')) {
    return 'blog';
  }

  return 'general';
}

// Generate AI response
function generateResponse(message: string, intent: string): string {
  const responses: Record<string, string> = {
    greeting: FAQ_RESPONSES.greeting,
    skills: FAQ_RESPONSES.skills,
    experience: FAQ_RESPONSES.experience,
    projects: FAQ_RESPONSES.projects,
    contact: FAQ_RESPONSES.contact,
    availability: FAQ_RESPONSES.availability,
    blog: `Alex writes about web development, AI integration, 3D web experiences, and modern development practices. Check the Blog page for recent articles.`,
    general: `I understand you're asking about "${message}". I'm Alex's AI assistant and I can help with questions about his skills, experience, projects, availability, or how to contact him. Could you be more specific about what you'd like to know?`,
  };

  return responses[intent] || responses.general;
}

export async function POST(request: Request) {
  try {
    const { message, conversationId } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Limit message length
    if (message.length > 500) {
      return NextResponse.json(
        { error: 'Message too long (max 500 characters)' },
        { status: 400 }
      );
    }

    // Get intent and generate response
    const intent = getIntent(message);
    const response = generateResponse(message, intent);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({
      success: true,
      response,
      intent,
      timestamp: new Date().toISOString(),
      conversationId: conversationId || `conv_${Date.now()}`,
    });

  } catch (error) {
    console.error('AI Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// For testing
export async function GET() {
  return NextResponse.json({
    message: 'AI Chat API is working',
    endpoints: {
      POST: 'Send a message to the AI assistant',
    },
    capabilities: [
      'Answer questions about skills and experience',
      'Provide project information',
      'Share contact details',
      'Discuss availability',
      'Direct to blog content',
    ],
  });
}
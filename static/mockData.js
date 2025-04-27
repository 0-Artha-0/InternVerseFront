// Mock data for testing frontend components
const mockData = {
  // User mock data
  currentUser: {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    university: 'UAE University',
    major: 'Computer Science',
    graduationYear: 2026,
    profilePicture: '',
    accountType: 'student',
    subscriptionTier: 'premium'
  },
  
  // Industries mock data
  industries: [
    {
      id: '1',
      name: 'Finance & Banking',
      description: 'Experience working in financial analysis, investment banking, or fintech environments.',
      icon: '',
      isActive: true
    },
    {
      id: '2',
      name: 'Marketing & Advertising',
      description: 'Develop skills in digital marketing, brand management, and market research.',
      icon: '',
      isActive: true
    },
    {
      id: '3',
      name: 'Software Development',
      description: 'Build real-world applications using modern programming languages and frameworks.',
      icon: '',
      isActive: true
    },
    {
      id: '4',
      name: 'Data Science & Analytics',
      description: 'Analyze complex datasets and create data-driven insights for business decisions.',
      icon: '',
      isActive: true
    }
  ],
  
  // Internship programs mock data
  internshipPrograms: [
    {
      id: '1',
      industry: '1',
      name: 'Investment Banking Internship',
      description: 'Learn about financial markets, investment strategies, and banking operations.',
      durationWeeks: 6,
      difficultyLevel: 'intermediate',
      isCorporateSponsored: true,
      corporatePartnerId: '1',
      isPremium: true
    },
    {
      id: '2',
      industry: '2',
      name: 'Digital Marketing Internship',
      description: 'Develop skills in social media marketing, SEO, and content strategy.',
      durationWeeks: 4,
      difficultyLevel: 'beginner',
      isCorporateSponsored: false,
      corporatePartnerId: null,
      isPremium: false
    },
    {
      id: '3',
      industry: '3',
      name: 'Full Stack Development Internship',
      description: 'Build web applications using modern frameworks and best practices.',
      durationWeeks: 8,
      difficultyLevel: 'advanced',
      isCorporateSponsored: true,
      corporatePartnerId: '2',
      isPremium: true
    }
  ],
  
  // User internships mock data
  userInternships: [
    {
      id: '1',
      user: '1',
      internshipProgram: '2',
      startDate: '2025-03-15T00:00:00.000Z',
      endDate: null,
      status: 'in_progress',
      progressPercentage: 65,
      currentTask: '2',
      certificate: null
    },
    {
      id: '2',
      user: '1',
      internshipProgram: '3',
      startDate: '2025-02-01T00:00:00.000Z',
      endDate: '2025-03-28T00:00:00.000Z',
      status: 'completed',
      progressPercentage: 100,
      currentTask: null,
      certificate: '1'
    }
  ],
  
  // Tasks mock data
  tasks: [
    {
      id: '1',
      internshipProgram: '2',
      title: 'Market Research Report',
      description: 'Conduct research on target market demographics and competitors.',
      instructions: 'Create a comprehensive report analyzing the target market and key competitors.',
      estimatedHours: 5,
      orderInProgram: 1,
      taskType: 'report',
      difficultyLevel: 'beginner'
    },
    {
      id: '2',
      internshipProgram: '2',
      title: 'Social Media Campaign',
      description: 'Create a social media campaign for a new product launch.',
      instructions: 'Develop a comprehensive social media strategy including content calendar and success metrics.',
      estimatedHours: 8,
      orderInProgram: 2,
      taskType: 'design',
      difficultyLevel: 'intermediate'
    },
    {
      id: '3',
      internshipProgram: '3',
      title: 'API Development',
      description: 'Design and implement RESTful APIs for a web application.',
      instructions: 'Create API endpoints with proper documentation and testing.',
      estimatedHours: 10,
      orderInProgram: 1,
      taskType: 'coding',
      difficultyLevel: 'advanced'
    }
  ],
  
  // Task submissions mock data
  taskSubmissions: [
    {
      id: '1',
      userInternship: '1',
      task: '1',
      submissionContent: 'This is a market research report submission...',
      submissionFileUrl: null,
      submissionDate: '2025-03-20T00:00:00.000Z',
      status: 'evaluated',
      aiFeedback: 'Great job on the market research! Your analysis of the target demographics is thorough and well-supported with data. Consider including more visual elements in future reports to enhance readability.',
      aiScore: 85
    }
  ],
  
  // AI supervisor interactions mock data
  aiSupervisorInteractions: [
    {
      id: '1',
      userInternship: '1',
      messageContent: 'Hello! I\'m starting my marketing internship today. Can you tell me more about what I should expect?',
      messageType: 'user_to_ai',
      timestamp: '2025-03-15T10:00:00.000Z',
      relatedTask: null
    },
    {
      id: '2',
      userInternship: '1',
      messageContent: 'Welcome to your Marketing Internship! I\'m your AI supervisor and I\'ll be guiding you through this virtual experience. You\'ll be working on various marketing tasks including market research, campaign development, and performance analysis. Your first task is a market research report - you\'ll need to analyze target demographics and competitors. Let me know if you have any questions as you work on this!',
      messageType: 'ai_to_user',
      timestamp: '2025-03-15T10:00:05.000Z',
      relatedTask: null
    },
    {
      id: '3',
      userInternship: '1',
      messageContent: 'I\'m working on the social media campaign task. Do you have any tips for creating an effective content calendar?',
      messageType: 'user_to_ai',
      timestamp: '2025-04-01T14:30:00.000Z',
      relatedTask: '2'
    },
    {
      id: '4',
      userInternship: '1',
      messageContent: 'Great question! For an effective content calendar, I recommend: 1) Identify key dates and events relevant to your product, 2) Vary content types (educational, promotional, entertaining) to keep the audience engaged, 3) Plan for consistent posting frequency, 4) Include platform-specific content optimized for each channel, and 5) Build in flexibility for real-time trends and opportunities. Would you like me to review your draft calendar when it\'s ready?',
      messageType: 'ai_to_user',
      timestamp: '2025-04-01T14:30:10.000Z',
      relatedTask: '2'
    }
  ],
  
  // Certificates mock data
  certificates: [
    {
      id: '1',
      user: '1',
      internshipProgram: '3',
      issueDate: '2025-03-28T00:00:00.000Z',
      certificateUrl: '/certificates/1',
      verificationCode: 'CERT-A1B2C3D4',
      isValid: true
    }
  ]
};

export default mockData;

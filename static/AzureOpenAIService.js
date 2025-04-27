const { OpenAIClient, AzureKeyCredential } = require('@azure/openai');
const config = require('../config/config');

class AzureOpenAIService {
  constructor() {
    this.client = new OpenAIClient(
      config.azureOpenAIEndpoint,
      new AzureKeyCredential(config.azureOpenAIKey)
    );
    this.deploymentName = config.azureOpenAIDeploymentName;
  }

  /**
   * Generate AI supervisor response based on conversation history and task context
   * @param {Array} conversationHistory - Array of previous messages
   * @param {Object} taskContext - Context about the current task
   * @returns {Promise<string>} - AI generated response
   */
  async generateSupervisorResponse(conversationHistory, taskContext) {
    try {
      const messages = [
        { role: "system", content: this.buildSystemPrompt(taskContext) },
        ...conversationHistory.map(msg => ({
          role: msg.messageType === 'user_to_ai' ? 'user' : 'assistant',
          content: msg.messageContent
        }))
      ];

      const response = await this.client.getChatCompletions(
        this.deploymentName,
        messages,
        {
          temperature: 0.7,
          maxTokens: 800
        }
      );

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error generating AI supervisor response:', error);
      throw new Error('Failed to generate AI supervisor response');
    }
  }

  /**
   * Generate task feedback based on student submission
   * @param {Object} task - Task details
   * @param {string} submission - Student's submission content
   * @returns {Promise<Object>} - Feedback and score
   */
  async generateTaskFeedback(task, submission) {
    try {
      const messages = [
        {
          role: "system",
          content: `You are an AI evaluator for a virtual internship program. 
          You are evaluating a student's submission for the following task: ${task.title}.
          Task description: ${task.description}
          Task instructions: ${task.instructions}
          
          Evaluate the submission based on the following criteria:
          1. Completeness - Did the student address all requirements?
          2. Quality - Is the work professionally done?
          3. Creativity - Does the submission show original thinking?
          4. Technical accuracy - Is the information correct?
          
          Provide constructive feedback with specific strengths and areas for improvement.
          Also provide a numerical score between 0-100.`
        },
        {
          role: "user",
          content: `Here is the student's submission:\n\n${submission}`
        }
      ];

      const response = await this.client.getChatCompletions(
        this.deploymentName,
        messages,
        {
          temperature: 0.5,
          maxTokens: 1000
        }
      );

      const feedbackText = response.choices[0].message.content;
      
      // Extract score from feedback (assuming the AI includes a score in its response)
      let score = 70; // Default score
      const scoreMatch = feedbackText.match(/score:?\s*(\d+)/i);
      if (scoreMatch && scoreMatch[1]) {
        score = parseInt(scoreMatch[1]);
        // Ensure score is within 0-100 range
        score = Math.min(100, Math.max(0, score));
      }

      return {
        feedback: feedbackText,
        score: score
      };
    } catch (error) {
      console.error('Error generating task feedback:', error);
      throw new Error('Failed to generate task feedback');
    }
  }

  /**
   * Generate a new task based on internship program and difficulty level
   * @param {Object} internshipProgram - Internship program details
   * @param {string} difficultyLevel - Difficulty level
   * @returns {Promise<Object>} - Generated task details
   */
  async generateTask(internshipProgram, difficultyLevel) {
    try {
      const messages = [
        {
          role: "system",
          content: `You are an AI task generator for a virtual internship program.
          Generate a realistic internship task for the following industry: ${internshipProgram.name}.
          Industry description: ${internshipProgram.description}
          Difficulty level: ${difficultyLevel}
          
          The task should include:
          1. A title
          2. A detailed description
          3. Clear instructions
          4. Estimated hours to complete (between 2-10 hours)
          5. Task type (one of: report, presentation, analysis, design, coding, other)
          
          Format your response as JSON with the following fields:
          {
            "title": "Task title",
            "description": "Detailed description",
            "instructions": "Step-by-step instructions",
            "estimatedHours": number,
            "taskType": "type"
          }`
        }
      ];

      const response = await this.client.getChatCompletions(
        this.deploymentName,
        messages,
        {
          temperature: 0.8,
          maxTokens: 1000
        }
      );

      const taskContent = response.choices[0].message.content;
      
      // Parse JSON from response
      try {
        const taskData = JSON.parse(taskContent);
        return {
          ...taskData,
          difficultyLevel,
          aiPromptTemplate: this.generatePromptTemplate(taskData, internshipProgram)
        };
      } catch (error) {
        console.error('Error parsing task JSON:', error);
        throw new Error('Failed to parse generated task');
      }
    } catch (error) {
      console.error('Error generating task:', error);
      throw new Error('Failed to generate task');
    }
  }

  /**
   * Build system prompt for AI supervisor based on task context
   * @param {Object} taskContext - Context about the current task
   * @returns {string} - System prompt
   */
  buildSystemPrompt(taskContext) {
    return `You are an AI supervisor for a virtual internship program.
    You are supervising a student working on the following task: ${taskContext.title}.
    
    Task description: ${taskContext.description}
    Task instructions: ${taskContext.instructions}
    
    Your role is to:
    1. Provide guidance and mentorship to the student
    2. Answer questions about the task
    3. Offer constructive feedback
    4. Simulate a real-world supervisor experience
    
    Be professional, supportive, and knowledgeable. Provide specific, actionable advice.
    Avoid being too formal or robotic - communicate like a real mentor would.`;
  }

  /**
   * Generate prompt template for future AI interactions related to this task
   * @param {Object} taskData - Task details
   * @param {Object} internshipProgram - Internship program details
   * @returns {string} - Prompt template
   */
  generatePromptTemplate(taskData, internshipProgram) {
    return `Task: ${taskData.title}
    Industry: ${internshipProgram.name}
    
    As an AI supervisor, guide the student through this ${taskData.taskType} task.
    The task involves: ${taskData.description.substring(0, 100)}...
    
    Provide industry-specific feedback, using terminology and standards from the ${internshipProgram.name} field.
    Evaluate submissions based on professional standards in this industry.`;
  }
}

module.exports = new AzureOpenAIService();

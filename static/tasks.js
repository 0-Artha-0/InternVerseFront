const express = require('express');
const auth = require('../middleware/auth');
const Task = require('../models/Task');
const UserInternship = require('../models/UserInternship');
const UserTaskSubmission = require('../models/UserTaskSubmission');
const AzureOpenAIService = require('../services/AzureOpenAIService');
const AzureCognitiveService = require('../services/AzureCognitiveService');

const router = express.Router();

/**
 * @route   GET /api/tasks/:id
 * @desc    Get task by ID
 * @access  Private
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('internshipProgram', 'name description');
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/tasks
 * @desc    Create a new task
 * @access  Private (Admin only)
 */
router.post('/', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.accountType !== 'system_admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const {
      internshipProgram,
      title,
      description,
      instructions,
      estimatedHours,
      orderInProgram,
      taskType,
      difficultyLevel,
      aiPromptTemplate
    } = req.body;
    
    // Create new task
    const task = new Task({
      internshipProgram,
      title,
      description,
      instructions,
      estimatedHours,
      orderInProgram,
      taskType,
      difficultyLevel,
      aiPromptTemplate
    });
    
    await task.save();
    
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/tasks/:id/submit
 * @desc    Submit a task
 * @access  Private
 */
router.post('/:id/submit', auth, async (req, res) => {
  try {
    const { userInternshipId, submissionContent, submissionFileUrl } = req.body;
    
    // Validate user internship exists and belongs to user
    const userInternship = await UserInternship.findOne({
      _id: userInternshipId,
      user: req.user._id
    });
    
    if (!userInternship) {
      return res.status(404).json({ message: 'User internship not found' });
    }
    
    // Validate task exists
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Create submission
    const submission = new UserTaskSubmission({
      userInternship: userInternshipId,
      task: req.params.id,
      submissionContent,
      submissionFileUrl: submissionFileUrl || null
    });
    
    await submission.save();
    
    // Update user internship progress
    // This is a simplified version - in a real app, you'd calculate progress based on all tasks
    userInternship.progressPercentage += (100 / task.orderInProgram);
    userInternship.progressPercentage = Math.min(userInternship.progressPercentage, 100);
    
    // If this was the current task, update to next task or mark as completed
    if (userInternship.currentTask && userInternship.currentTask.toString() === req.params.id) {
      // Find next task
      const nextTask = await Task.findOne({
        internshipProgram: userInternship.internshipProgram,
        orderInProgram: task.orderInProgram + 1
      });
      
      if (nextTask) {
        userInternship.currentTask = nextTask._id;
      } else {
        // No more tasks, mark as completed
        userInternship.status = 'completed';
        userInternship.endDate = Date.now();
      }
    }
    
    await userInternship.save();
    
    // Generate AI feedback asynchronously
    generateAIFeedback(submission._id, task._id, submissionContent);
    
    res.status(201).json(submission);
  } catch (error) {
    console.error('Error submitting task:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/tasks/:id/feedback
 * @desc    Get AI feedback for a task submission
 * @access  Private
 */
router.get('/:id/feedback', auth, async (req, res) => {
  try {
    const { submissionId } = req.query;
    
    if (!submissionId) {
      return res.status(400).json({ message: 'Submission ID is required' });
    }
    
    // Find submission and validate it belongs to user
    const submission = await UserTaskSubmission.findById(submissionId)
      .populate({
        path: 'userInternship',
        select: 'user',
        match: { user: req.user._id }
      });
    
    if (!submission || !submission.userInternship) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    
    // Check if feedback is ready
    if (submission.status !== 'evaluated') {
      return res.status(202).json({ 
        message: 'Feedback is still being generated',
        status: submission.status
      });
    }
    
    res.json({
      feedback: submission.aiFeedback,
      score: submission.aiScore,
      status: submission.status
    });
  } catch (error) {
    console.error('Error getting feedback:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * Helper function to generate AI feedback asynchronously
 */
async function generateAIFeedback(submissionId, taskId, submissionContent) {
  try {
    // Find task
    const task = await Task.findById(taskId);
    if (!task) {
      console.error('Task not found for feedback generation');
      return;
    }
    
    // Generate feedback using Azure OpenAI
    const feedbackResult = await AzureOpenAIService.generateTaskFeedback(task, submissionContent);
    
    // Analyze submission quality using Azure Cognitive Services
    const qualityAnalysis = await AzureCognitiveService.analyzeSubmissionQuality(submissionContent);
    
    // Combine AI score with quality analysis
    const combinedScore = Math.round((feedbackResult.score * 0.7) + (qualityAnalysis.overallScore * 0.3));
    
    // Update submission with feedback
    await UserTaskSubmission.findByIdAndUpdate(submissionId, {
      aiFeedback: feedbackResult.feedback,
      aiScore: combinedScore,
      status: 'evaluated'
    });
    
    console.log(`Feedback generated for submission ${submissionId}`);
  } catch (error) {
    console.error('Error generating AI feedback:', error.message);
  }
}

module.exports = router;

const express = require('express');
const auth = require('../middleware/auth');
const AISupervisorInteraction = require('../models/AISupervisorInteraction');
const UserInternship = require('../models/UserInternship');
const Task = require('../models/Task');
const AzureOpenAIService = require('../services/AzureOpenAIService');

const router = express.Router();

/**
 * @route   GET /api/ai-supervisor/:userInternshipId/chat
 * @desc    Get chat history with AI supervisor
 * @access  Private
 */
router.get('/:userInternshipId/chat', auth, async (req, res) => {
  try {
    // Validate user internship exists and belongs to user
    const userInternship = await UserInternship.findOne({
      _id: req.params.userInternshipId,
      user: req.user._id
    });
    
    if (!userInternship) {
      return res.status(404).json({ message: 'User internship not found' });
    }
    
    // Get chat history
    const chatHistory = await AISupervisorInteraction.find({
      userInternship: req.params.userInternshipId
    }).sort({ timestamp: 1 });
    
    res.json(chatHistory);
  } catch (error) {
    console.error('Error fetching chat history:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/ai-supervisor/:userInternshipId/chat
 * @desc    Send message to AI supervisor
 * @access  Private
 */
router.post('/:userInternshipId/chat', auth, async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }
    
    // Validate user internship exists and belongs to user
    const userInternship = await UserInternship.findOne({
      _id: req.params.userInternshipId,
      user: req.user._id
    }).populate('currentTask');
    
    if (!userInternship) {
      return res.status(404).json({ message: 'User internship not found' });
    }
    
    // Create user message
    const userMessage = new AISupervisorInteraction({
      userInternship: req.params.userInternshipId,
      messageContent: message,
      messageType: 'user_to_ai',
      relatedTask: userInternship.currentTask ? userInternship.currentTask._id : null
    });
    
    await userMessage.save();
    
    // Get chat history
    const chatHistory = await AISupervisorInteraction.find({
      userInternship: req.params.userInternshipId
    }).sort({ timestamp: 1 }).limit(10);
    
    // Get task context
    let taskContext = null;
    if (userInternship.currentTask) {
      taskContext = {
        title: userInternship.currentTask.title,
        description: userInternship.currentTask.description,
        instructions: userInternship.currentTask.instructions
      };
    } else {
      // If no current task, get internship program details
      const internship = await InternshipProgram.findById(userInternship.internshipProgram);
      taskContext = {
        title: `${internship.name} Orientation`,
        description: `Welcome to your ${internship.name} internship.`,
        instructions: `Explore the available tasks and get started on your virtual internship journey.`
      };
    }
    
    // Generate AI response
    const aiResponse = await AzureOpenAIService.generateSupervisorResponse(chatHistory, taskContext);
    
    // Save AI response
    const aiMessage = new AISupervisorInteraction({
      userInternship: req.params.userInternshipId,
      messageContent: aiResponse,
      messageType: 'ai_to_user',
      relatedTask: userInternship.currentTask ? userInternship.currentTask._id : null
    });
    
    await aiMessage.save();
    
    res.json(aiMessage);
  } catch (error) {
    console.error('Error sending message to AI supervisor:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

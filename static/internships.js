const express = require('express');
const auth = require('../middleware/auth');
const InternshipProgram = require('../models/InternshipProgram');
const Industry = require('../models/Industry');
const AzureOpenAIService = require('../services/AzureOpenAIService');

const router = express.Router();

/**
 * @route   GET /api/internships
 * @desc    Get all internship programs
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const { industry, difficulty, premium } = req.query;
    
    // Build filter object
    const filter = {};
    if (industry) filter.industry = industry;
    if (difficulty) filter.difficultyLevel = difficulty;
    if (premium !== undefined) filter.isPremium = premium === 'true';
    
    const internships = await InternshipProgram.find(filter).populate('industry', 'name description');
    res.json(internships);
  } catch (error) {
    console.error('Error fetching internships:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/internships/:id
 * @desc    Get internship program by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const internship = await InternshipProgram.findById(req.params.id)
      .populate('industry', 'name description')
      .populate('corporatePartnerId', 'companyName logo');
    
    if (!internship) {
      return res.status(404).json({ message: 'Internship program not found' });
    }
    
    res.json(internship);
  } catch (error) {
    console.error('Error fetching internship:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Internship program not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/internships
 * @desc    Create a new internship program
 * @access  Private (Admin or Corporate Partner)
 */
router.post('/', auth, async (req, res) => {
  try {
    // Check if user is admin or corporate partner
    if (req.user.accountType !== 'system_admin' && req.user.accountType !== 'corporate_partner') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const { 
      industry, 
      name, 
      description, 
      durationWeeks, 
      difficultyLevel, 
      isCorporateSponsored,
      corporatePartnerId,
      isPremium 
    } = req.body;
    
    // Validate industry exists
    const industryExists = await Industry.findById(industry);
    if (!industryExists) {
      return res.status(400).json({ message: 'Invalid industry' });
    }
    
    // Create new internship program
    const internship = new InternshipProgram({
      industry,
      name,
      description,
      durationWeeks,
      difficultyLevel,
      isCorporateSponsored: isCorporateSponsored || false,
      corporatePartnerId: corporatePartnerId || null,
      isPremium: isPremium || false
    });
    
    await internship.save();
    
    res.status(201).json(internship);
  } catch (error) {
    console.error('Error creating internship program:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   PUT /api/internships/:id
 * @desc    Update an internship program
 * @access  Private (Admin or Corporate Partner)
 */
router.put('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin or corporate partner
    if (req.user.accountType !== 'system_admin' && req.user.accountType !== 'corporate_partner') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const internship = await InternshipProgram.findById(req.params.id);
    
    if (!internship) {
      return res.status(404).json({ message: 'Internship program not found' });
    }
    
    // If user is corporate partner, check if they own this internship
    if (req.user.accountType === 'corporate_partner' && 
        internship.corporatePartnerId && 
        internship.corporatePartnerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Update fields
    const updateFields = [
      'name', 'description', 'durationWeeks', 'difficultyLevel', 
      'isCorporateSponsored', 'corporatePartnerId', 'isPremium'
    ];
    
    updateFields.forEach(field => {
      if (req.body[field] !== undefined) {
        internship[field] = req.body[field];
      }
    });
    
    // If industry is being updated, validate it exists
    if (req.body.industry) {
      const industryExists = await Industry.findById(req.body.industry);
      if (!industryExists) {
        return res.status(400).json({ message: 'Invalid industry' });
      }
      internship.industry = req.body.industry;
    }
    
    await internship.save();
    
    res.json(internship);
  } catch (error) {
    console.error('Error updating internship program:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Internship program not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/internships/:id/generate-task
 * @desc    Generate a new task for an internship program using AI
 * @access  Private (Admin only)
 */
router.post('/:id/generate-task', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.accountType !== 'system_admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const { difficultyLevel } = req.body;
    
    // Validate difficulty level
    if (!['beginner', 'intermediate', 'advanced'].includes(difficultyLevel)) {
      return res.status(400).json({ message: 'Invalid difficulty level' });
    }
    
    // Get internship program
    const internship = await InternshipProgram.findById(req.params.id)
      .populate('industry', 'name description');
    
    if (!internship) {
      return res.status(404).json({ message: 'Internship program not found' });
    }
    
    // Generate task using Azure OpenAI
    const generatedTask = await AzureOpenAIService.generateTask(internship, difficultyLevel);
    
    res.json(generatedTask);
  } catch (error) {
    console.error('Error generating task:', error.message);
    res.status(500).json({ message: 'Failed to generate task' });
  }
});

module.exports = router;

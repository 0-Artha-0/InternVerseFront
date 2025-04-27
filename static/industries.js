const express = require('express');
const auth = require('../middleware/auth');
const Industry = require('../models/Industry');

const router = express.Router();

/**
 * @route   GET /api/industries
 * @desc    Get all active industries
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const industries = await Industry.find({ isActive: true });
    res.json(industries);
  } catch (error) {
    console.error('Error fetching industries:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/industries/:id
 * @desc    Get industry by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const industry = await Industry.findById(req.params.id);
    
    if (!industry) {
      return res.status(404).json({ message: 'Industry not found' });
    }
    
    res.json(industry);
  } catch (error) {
    console.error('Error fetching industry:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Industry not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/industries
 * @desc    Create a new industry
 * @access  Private (Admin only)
 */
router.post('/', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.accountType !== 'system_admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const { name, description, icon } = req.body;
    
    // Check if industry already exists
    const existingIndustry = await Industry.findOne({ name });
    if (existingIndustry) {
      return res.status(400).json({ message: 'Industry already exists' });
    }
    
    // Create new industry
    const industry = new Industry({
      name,
      description,
      icon: icon || ''
    });
    
    await industry.save();
    
    res.status(201).json(industry);
  } catch (error) {
    console.error('Error creating industry:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   PUT /api/industries/:id
 * @desc    Update an industry
 * @access  Private (Admin only)
 */
router.put('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.accountType !== 'system_admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const { name, description, icon, isActive } = req.body;
    
    // Find industry
    const industry = await Industry.findById(req.params.id);
    
    if (!industry) {
      return res.status(404).json({ message: 'Industry not found' });
    }
    
    // Update fields
    if (name) industry.name = name;
    if (description) industry.description = description;
    if (icon !== undefined) industry.icon = icon;
    if (isActive !== undefined) industry.isActive = isActive;
    
    await industry.save();
    
    res.json(industry);
  } catch (error) {
    console.error('Error updating industry:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Industry not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   DELETE /api/industries/:id
 * @desc    Delete an industry
 * @access  Private (Admin only)
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.accountType !== 'system_admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Find industry
    const industry = await Industry.findById(req.params.id);
    
    if (!industry) {
      return res.status(404).json({ message: 'Industry not found' });
    }
    
    await industry.remove();
    
    res.json({ message: 'Industry removed' });
  } catch (error) {
    console.error('Error deleting industry:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Industry not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

const mongoose = require('mongoose');

const InternshipProgramSchema = new mongoose.Schema({
  industry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Industry',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  durationWeeks: {
    type: Number,
    required: true
  },
  difficultyLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  isCorporateSponsored: {
    type: Boolean,
    default: false
  },
  corporatePartnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CorporatePartner',
    default: null
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware to update the updatedAt field
InternshipProgramSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('InternshipProgram', InternshipProgramSchema);

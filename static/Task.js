const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  internshipProgram: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InternshipProgram',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  estimatedHours: {
    type: Number,
    required: true
  },
  orderInProgram: {
    type: Number,
    required: true
  },
  taskType: {
    type: String,
    enum: ['report', 'presentation', 'analysis', 'design', 'coding', 'other'],
    required: true
  },
  difficultyLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  aiPromptTemplate: {
    type: String,
    required: true
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
TaskSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Task', TaskSchema);

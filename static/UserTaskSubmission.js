const mongoose = require('mongoose');

const UserTaskSubmissionSchema = new mongoose.Schema({
  userInternship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInternship',
    required: true
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  submissionContent: {
    type: String,
    required: true
  },
  submissionFileUrl: {
    type: String,
    default: null
  },
  submissionDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['submitted', 'evaluated', 'revision_requested'],
    default: 'submitted'
  },
  aiFeedback: {
    type: String,
    default: null
  },
  aiScore: {
    type: Number,
    default: null
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
UserTaskSubmissionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('UserTaskSubmission', UserTaskSubmissionSchema);

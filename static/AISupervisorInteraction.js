const mongoose = require('mongoose');

const AISupervisorInteractionSchema = new mongoose.Schema({
  userInternship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInternship',
    required: true
  },
  messageContent: {
    type: String,
    required: true
  },
  messageType: {
    type: String,
    enum: ['user_to_ai', 'ai_to_user'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  relatedTask: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AISupervisorInteraction', AISupervisorInteractionSchema);

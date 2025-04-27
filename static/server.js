const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import configuration
const config = require('./src/config/config');

// Import routes
const authRoutes = require('./src/routes/auth');
const industriesRoutes = require('./src/routes/industries');
const internshipsRoutes = require('./src/routes/internships');
const tasksRoutes = require('./src/routes/tasks');
const aiSupervisorRoutes = require('./src/routes/ai-supervisor');
const certificatesRoutes = require('./src/routes/certificates');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: config.corsOrigin }));
app.use(helmet());
app.use(morgan('dev'));

// Connect to MongoDB
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/industries', industriesRoutes);
app.use('/api/internships', internshipsRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/ai-supervisor', aiSupervisorRoutes);
app.use('/api/certificates', certificatesRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

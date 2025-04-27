require('dotenv').config();

module.exports = {
  // Server configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database configuration
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/ai_internship_simulator',
  
  // JWT configuration
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  
  // Azure OpenAI configuration
  azureOpenAIEndpoint: process.env.AZURE_OPENAI_ENDPOINT,
  azureOpenAIKey: process.env.AZURE_OPENAI_KEY,
  azureOpenAIDeploymentName: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
  
  // Azure Bot Service configuration
  azureBotServiceEndpoint: process.env.AZURE_BOT_SERVICE_ENDPOINT,
  azureBotServiceKey: process.env.AZURE_BOT_SERVICE_KEY,
  
  // Azure Cognitive Services configuration
  azureCognitiveServicesEndpoint: process.env.AZURE_COGNITIVE_SERVICES_ENDPOINT,
  azureCognitiveServicesKey: process.env.AZURE_COGNITIVE_SERVICES_KEY,
  
  // CORS configuration
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
};

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../src/models/User');
const Industry = require('../src/models/Industry');
const InternshipProgram = require('../src/models/InternshipProgram');

// Mock data for testing
const testUser = {
  email: 'test@example.com',
  password: 'password123',
  firstName: 'Test',
  lastName: 'User',
  university: 'Test University',
  major: 'Computer Science',
  graduationYear: 2026
};

const testIndustry = {
  name: 'Test Industry',
  description: 'Industry for testing',
  icon: 'test-icon.png'
};

const testInternship = {
  name: 'Test Internship',
  description: 'Internship for testing',
  durationWeeks: 4,
  difficultyLevel: 'beginner',
  isPremium: false
};

// Setup and teardown
beforeAll(async () => {
  // Connect to test database
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ai_internship_simulator_test';
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  // Clean up database and close connection
  await User.deleteMany({});
  await Industry.deleteMany({});
  await InternshipProgram.deleteMany({});
  await mongoose.connection.close();
});

beforeEach(async () => {
  // Clean up collections before each test
  await User.deleteMany({});
  await Industry.deleteMany({});
  await InternshipProgram.deleteMany({});
});

describe('Auth API', () => {
  test('User registration', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  test('User login', async () => {
    // First register a user
    await request(app)
      .post('/api/auth/register')
      .send(testUser);
    
    // Then try to login
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('Invalid login', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'wrongpassword'
      });
    
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});

describe('Industries API', () => {
  test('Get all industries', async () => {
    // Create test industry
    const industry = new Industry(testIndustry);
    await industry.save();
    
    const response = await request(app)
      .get('/api/industries');
    
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe(testIndustry.name);
  });

  test('Get industry by ID', async () => {
    // Create test industry
    const industry = new Industry(testIndustry);
    await industry.save();
    
    const response = await request(app)
      .get(`/api/industries/${industry._id}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(testIndustry.name);
  });
});

describe('Internships API', () => {
  let token;
  let industryId;

  beforeEach(async () => {
    // Create a user and get token
    const userResponse = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    
    token = userResponse.body.token;
    
    // Create an industry
    const industry = new Industry(testIndustry);
    await industry.save();
    industryId = industry._id;
  });

  test('Get all internships', async () => {
    // Create test internship
    const internship = new InternshipProgram({
      ...testInternship,
      industry: industryId
    });
    await internship.save();
    
    const response = await request(app)
      .get('/api/internships');
    
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe(testInternship.name);
  });

  test('Get internship by ID', async () => {
    // Create test internship
    const internship = new InternshipProgram({
      ...testInternship,
      industry: industryId
    });
    await internship.save();
    
    const response = await request(app)
      .get(`/api/internships/${internship._id}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(testInternship.name);
  });
});

// Additional test suites would be added for other API endpoints
// including tasks, AI supervisor, certificates, etc.

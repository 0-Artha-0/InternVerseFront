import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    return token ? true : false;
  },
  logout: () => {
    localStorage.removeItem('token');
  }
};

// Industry services
export const industryService = {
  getAllIndustries: () => api.get('/industries'),
  getIndustryById: (id) => api.get(`/industries/${id}`)
};

// Internship services
export const internshipService = {
  getAllInternships: (filters) => api.get('/internships', { params: filters }),
  getInternshipById: (id) => api.get(`/internships/${id}`),
  enrollInInternship: (internshipId) => api.post('/user-internships', { internshipProgram: internshipId })
};

// Task services
export const taskService = {
  getTaskById: (id) => api.get(`/tasks/${id}`),
  submitTask: (taskId, data) => api.post(`/tasks/${taskId}/submit`, data),
  getTaskFeedback: (taskId, submissionId) => api.get(`/tasks/${taskId}/feedback`, { params: { submissionId } })
};

// AI Supervisor services
export const aiSupervisorService = {
  getChatHistory: (userInternshipId) => api.get(`/ai-supervisor/${userInternshipId}/chat`),
  sendMessage: (userInternshipId, message) => api.post(`/ai-supervisor/${userInternshipId}/chat`, { message })
};

// Certificate services
export const certificateService = {
  getUserCertificates: () => api.get('/certificates/user'),
  getCertificateById: (id) => api.get(`/certificates/${id}`),
  generateCertificate: (userInternshipId) => api.post('/certificates/generate', { userInternshipId }),
  verifyCertificate: (code) => api.get(`/certificates/verify/${code}`)
};

// User internship services
export const userInternshipService = {
  getUserInternships: () => api.get('/user-internships'),
  getUserInternshipById: (id) => api.get(`/user-internships/${id}`)
};

export default api;

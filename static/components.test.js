import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import IndustrySelection from '../pages/IndustrySelection';
import SimulationWorkspace from '../pages/SimulationWorkspace';
import Certificates from '../pages/Certificates';
import mockData from '../services/mockData';

// Mock the API service
jest.mock('../services/api', () => ({
  authService: {
    login: jest.fn().mockResolvedValue({ data: { token: 'mock-token' } }),
    register: jest.fn().mockResolvedValue({ data: { token: 'mock-token' } })
  },
  industryService: {
    getAllIndustries: jest.fn().mockResolvedValue({ data: mockData.industries })
  },
  internshipService: {
    getAllInternships: jest.fn().mockResolvedValue({ data: mockData.internshipPrograms })
  },
  userInternshipService: {
    getUserInternships: jest.fn().mockResolvedValue({ data: mockData.userInternships })
  },
  taskService: {
    getTaskById: jest.fn().mockResolvedValue({ data: mockData.tasks[1] })
  },
  aiSupervisorService: {
    getChatHistory: jest.fn().mockResolvedValue({ data: mockData.aiSupervisorInteractions })
  },
  certificateService: {
    getUserCertificates: jest.fn().mockResolvedValue({ data: mockData.certificates })
  }
}));

// Wrap component with router for testing
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('Login Component', () => {
  test('renders login form', () => {
    renderWithRouter(<Login />);
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    renderWithRouter(<Login />);
    
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
    
    // Wait for the form submission to complete
    await waitFor(() => {
      expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    });
  });
});

describe('Register Component', () => {
  test('renders registration form', () => {
    renderWithRouter(<Register />);
    expect(screen.getByText(/Create Your Account/i)).toBeInTheDocument();
  });

  test('navigates through registration steps', async () => {
    renderWithRouter(<Register />);
    
    // Step 1: Account Information
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'newuser@example.com' }
    });
    
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' }
    });
    
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    
    // Step 2: Personal Details
    await waitFor(() => {
      expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    });
    
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: 'John' }
    });
    
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: 'Doe' }
    });
    
    fireEvent.change(screen.getByLabelText(/University/i), {
      target: { value: 'UAE University' }
    });
    
    fireEvent.change(screen.getByLabelText(/Major/i), {
      target: { value: 'Computer Science' }
    });
    
    // Continue with more form fields and steps
  });
});

describe('Dashboard Component', () => {
  test('renders dashboard with user internships', async () => {
    renderWithRouter(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText(/Student Dashboard/i)).toBeInTheDocument();
    });
    
    // Check for active internships section
    expect(screen.getByText(/Active Internships/i)).toBeInTheDocument();
    
    // Check for completed internships section
    expect(screen.getByText(/Completed Internships/i)).toBeInTheDocument();
    
    // Check for recommended internships section
    expect(screen.getByText(/Recommended For You/i)).toBeInTheDocument();
  });
});

describe('IndustrySelection Component', () => {
  test('renders industry selection page with industries', async () => {
    renderWithRouter(<IndustrySelection />);
    
    await waitFor(() => {
      expect(screen.getByText(/Select Your Industry/i)).toBeInTheDocument();
    });
    
    // Check if industries are displayed
    expect(screen.getByText(/Finance & Banking/i)).toBeInTheDocument();
    expect(screen.getByText(/Marketing & Advertising/i)).toBeInTheDocument();
    expect(screen.getByText(/Software Development/i)).toBeInTheDocument();
  });
});

describe('SimulationWorkspace Component', () => {
  test('renders simulation workspace with task details', async () => {
    // Mock route params
    const match = {
      params: {
        id: '1'
      }
    };
    
    renderWithRouter(<SimulationWorkspace match={match} />);
    
    await waitFor(() => {
      expect(screen.getByText(/Current Task/i)).toBeInTheDocument();
    });
    
    // Check for task details
    expect(screen.getByText(/Social Media Campaign/i)).toBeInTheDocument();
    
    // Check for AI supervisor tab
    expect(screen.getByText(/AI Supervisor/i)).toBeInTheDocument();
    
    // Check for feedback tab
    expect(screen.getByText(/Feedback/i)).toBeInTheDocument();
  });
});

describe('Certificates Component', () => {
  test('renders certificates page with user certificates', async () => {
    renderWithRouter(<Certificates />);
    
    await waitFor(() => {
      expect(screen.getByText(/My Certificates/i)).toBeInTheDocument();
    });
    
    // Check for certificate verification section
    expect(screen.getByText(/Verify a Certificate/i)).toBeInTheDocument();
  });
});

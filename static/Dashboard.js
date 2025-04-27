import React from 'react';
import { Box, Typography, Container, Grid, Paper, Card, CardContent, Button, Divider, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const Dashboard = () => {
  // Mock data for dashboard
  const activeInternships = [
    {
      id: 1,
      title: 'Marketing Internship',
      company: 'TechStart',
      progress: 65,
      nextTask: 'Prepare social media campaign',
      dueDate: '2025-04-25',
    },
    {
      id: 2,
      title: 'Data Analysis Internship',
      company: 'FinTech Solutions',
      progress: 30,
      nextTask: 'Analyze quarterly sales data',
      dueDate: '2025-04-23',
    }
  ];

  const completedInternships = [
    {
      id: 3,
      title: 'Software Development Internship',
      company: 'CodeCraft',
      completionDate: '2025-03-15',
      certificateId: 'CERT-SD-2025-001',
    }
  ];

  const recommendedInternships = [
    {
      id: 4,
      title: 'UX/UI Design Internship',
      company: 'DesignHub',
      description: 'Learn the fundamentals of user experience and interface design',
      difficulty: 'Intermediate',
    },
    {
      id: 5,
      title: 'Project Management Internship',
      company: 'BuildRight',
      description: 'Gain experience in managing tech projects from start to finish',
      difficulty: 'Advanced',
    },
    {
      id: 6,
      title: 'Digital Marketing Internship',
      company: 'GrowthMarket',
      description: 'Master digital marketing strategies and analytics',
      difficulty: 'Beginner',
    }
  ];

  return (
    <Box className="page-container">
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Student Dashboard
        </Typography>
        
        {/* Welcome Section */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, bgcolor: '#f0f4ff' }}>
          <Typography variant="h5" gutterBottom>
            Welcome back, Sarah!
          </Typography>
          <Typography variant="body1">
            You have {activeInternships.length} active internships and {recommendedInternships.length} recommended opportunities based on your profile.
          </Typography>
        </Paper>
        
        {/* Active Internships */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Active Internships
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {activeInternships.map((internship) => (
            <Grid item xs={12} md={6} key={internship.id}>
              <StyledPaper elevation={3}>
                <Typography variant="h6" gutterBottom>
                  {internship.title}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  {internship.company}
                </Typography>
                
                <Box sx={{ mt: 2, mb: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    Progress: {internship.progress}%
                  </Typography>
                  <Box sx={{ width: '100%', bgcolor: '#e0e0e0', borderRadius: 1, height: 8 }}>
                    <Box 
                      sx={{ 
                        width: `${internship.progress}%`, 
                        bgcolor: 'primary.main', 
                        borderRadius: 1, 
                        height: 8 
                      }} 
                    />
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" gutterBottom>
                  Next Task:
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {internship.nextTask}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Due: {internship.dueDate}
                </Typography>
                
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Continue Internship
                </Button>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
        
        {/* Completed Internships */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Completed Internships
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {completedInternships.length > 0 ? (
            completedInternships.map((internship) => (
              <Grid item xs={12} md={6} key={internship.id}>
                <StyledPaper elevation={3}>
                  <Typography variant="h6" gutterBottom>
                    {internship.title}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    {internship.company}
                  </Typography>
                  
                  <Chip 
                    label="Completed" 
                    color="success" 
                    size="small" 
                    sx={{ mt: 1, mb: 2 }} 
                  />
                  
                  <Typography variant="body2" gutterBottom>
                    Completion Date: {internship.completionDate}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Certificate ID: {internship.certificateId}
                  </Typography>
                  
                  <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Button 
                      variant="outlined" 
                      color="primary"
                    >
                      View Certificate
                    </Button>
                    <Button 
                      variant="outlined"
                    >
                      View Portfolio
                    </Button>
                  </Box>
                </StyledPaper>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="textSecondary">
                  You haven't completed any internships yet. Start one from the recommended section below!
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
        
        {/* Recommended Internships */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Recommended For You
        </Typography>
        <Grid container spacing={3}>
          {recommendedInternships.map((internship) => (
            <Grid item xs={12} sm={6} md={4} key={internship.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    {internship.title}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    {internship.company}
                  </Typography>
                  <Chip 
                    label={internship.difficulty} 
                    size="small" 
                    sx={{ mb: 2 }} 
                    color={
                      internship.difficulty === 'Beginner' ? 'success' : 
                      internship.difficulty === 'Intermediate' ? 'primary' : 'secondary'
                    }
                  />
                  <Typography variant="body2">
                    {internship.description}
                  </Typography>
                </CardContent>
                <Box p={2} pt={0}>
                  <Button variant="contained" color="primary" fullWidth>
                    Start Internship
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;

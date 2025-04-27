import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

const IndustrySelection = () => {
  // Mock data for industries
  const industries = [
    {
      id: 1,
      name: 'Finance & Banking',
      description: 'Experience working in financial analysis, investment banking, or fintech environments.',
      color: '#e3f2fd',
      internships: 5,
    },
    {
      id: 2,
      name: 'Marketing & Advertising',
      description: 'Develop skills in digital marketing, brand management, and market research.',
      color: '#e8f5e9',
      internships: 8,
    },
    {
      id: 3,
      name: 'Software Development',
      description: 'Build real-world applications using modern programming languages and frameworks.',
      color: '#f3e5f5',
      internships: 6,
    },
    {
      id: 4,
      name: 'Data Science & Analytics',
      description: 'Analyze complex datasets and create data-driven insights for business decisions.',
      color: '#fff3e0',
      internships: 4,
    },
    {
      id: 5,
      name: 'UX/UI Design',
      description: 'Design user-centered digital experiences and interfaces for web and mobile applications.',
      color: '#e0f7fa',
      internships: 3,
    },
    {
      id: 6,
      name: 'Healthcare',
      description: 'Gain experience in healthcare management, medical research, and health informatics.',
      color: '#f1f8e9',
      internships: 4,
    },
    {
      id: 7,
      name: 'Engineering',
      description: 'Work on engineering projects across civil, mechanical, or electrical disciplines.',
      color: '#fce4ec',
      internships: 5,
    },
    {
      id: 8,
      name: 'Business Management',
      description: 'Develop skills in project management, operations, and business strategy.',
      color: '#e8eaf6',
      internships: 7,
    },
  ];

  return (
    <Box className="page-container">
      <Container>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Select Your Industry
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Choose from a variety of industries to start your virtual internship experience. Each industry offers unique projects and challenges designed to build relevant skills.
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          {industries.map((industry) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={industry.id}>
              <StyledCard>
                <CardMedia
                  component="div"
                  sx={{ 
                    height: 140, 
                    bgcolor: industry.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    [Industry Icon]
                  </Typography>
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {industry.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {industry.description}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {industry.internships} internship programs available
                  </Typography>
                  <Button variant="contained" color="primary" fullWidth>
                    Explore Programs
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Not sure which industry to choose?
          </Typography>
          <Typography variant="body1" paragraph>
            Take our career assessment to discover which industries align with your skills and interests.
          </Typography>
          <Button variant="outlined" color="primary" size="large">
            Take Career Assessment
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default IndustrySelection;

import React from 'react';
import { Box, Typography, Container, Grid, Button, Card, CardContent, CardMedia, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)',
  color: 'white',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 0),
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

const LandingPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                AI-Powered Virtual Internship Simulator
              </Typography>
              <Typography variant="h5" paragraph>
                Gain real-world work experience through AI-simulated internships across multiple industries.
              </Typography>
              <Box mt={4}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="large" 
                  component={Link} 
                  to="/register"
                  sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outlined" 
                  color="inherit" 
                  size="large"
                  component={Link}
                  to="/industries"
                >
                  Explore Industries
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={6} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ height: { xs: 250, md: 350 }, bgcolor: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="h6" color="textSecondary">
                    [Hero Image Placeholder]
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Features Section */}
      <Box py={8}>
        <Container>
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            Key Features
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            Experience the future of internships with our AI-powered platform
          </Typography>
          
          <Grid container spacing={4} mt={4}>
            {/* Feature 1 */}
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard>
                <CardMedia
                  component="div"
                  sx={{ height: 140, bgcolor: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Typography variant="body2" color="textSecondary">
                    [Industry Selection Icon]
                  </Typography>
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Industry Selection
                  </Typography>
                  <Typography>
                    Choose from a wide range of industries including finance, marketing, software development, and engineering.
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
            
            {/* Feature 2 */}
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard>
                <CardMedia
                  component="div"
                  sx={{ height: 140, bgcolor: '#e8eaf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Typography variant="body2" color="textSecondary">
                    [AI Supervisor Icon]
                  </Typography>
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    AI Supervisor
                  </Typography>
                  <Typography>
                    Receive guidance and feedback from an AI supervisor that simulates real-world team interactions.
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
            
            {/* Feature 3 */}
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard>
                <CardMedia
                  component="div"
                  sx={{ height: 140, bgcolor: '#e0f7fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Typography variant="body2" color="textSecondary">
                    [Certificate Icon]
                  </Typography>
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Verified Certificates
                  </Typography>
                  <Typography>
                    Earn virtual internship certificates that showcase your skills and experience to potential employers.
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box py={8} sx={{ bgcolor: '#f5f5f5' }}>
        <Container>
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            How It Works
          </Typography>
          
          <Grid container spacing={4} mt={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Typography variant="h5" gutterBottom>
                    For Students
                  </Typography>
                  <Box component="ol" sx={{ mt: 2, pl: 2, flexGrow: 1 }}>
                    <Typography component="li" paragraph>
                      Register and create your profile with your career interests
                    </Typography>
                    <Typography component="li" paragraph>
                      Select an industry and internship type
                    </Typography>
                    <Typography component="li" paragraph>
                      Complete realistic tasks assigned by the AI supervisor
                    </Typography>
                    <Typography component="li" paragraph>
                      Receive personalized feedback on your submissions
                    </Typography>
                    <Typography component="li" paragraph>
                      Earn a verified certificate upon completion
                    </Typography>
                  </Box>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    component={Link} 
                    to="/register"
                    sx={{ alignSelf: 'flex-start', mt: 2 }}
                  >
                    Sign Up Now
                  </Button>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Typography variant="h5" gutterBottom>
                    For Universities & Partners
                  </Typography>
                  <Box component="ol" sx={{ mt: 2, pl: 2, flexGrow: 1 }}>
                    <Typography component="li" paragraph>
                      Partner with our platform to offer virtual internships to your students
                    </Typography>
                    <Typography component="li" paragraph>
                      Access comprehensive analytics on student performance
                    </Typography>
                    <Typography component="li" paragraph>
                      Create branded internship simulations for your organization
                    </Typography>
                    <Typography component="li" paragraph>
                      Identify top talent through simulation performance
                    </Typography>
                    <Typography component="li" paragraph>
                      Enhance your career services with AI-powered tools
                    </Typography>
                  </Box>
                  <Button 
                    variant="contained" 
                    color="primary"
                    sx={{ alignSelf: 'flex-start', mt: 2 }}
                  >
                    Partner With Us
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box py={8}>
        <Container>
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            Pricing Plans
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            Choose the plan that fits your needs
          </Typography>
          
          <Grid container spacing={4} mt={4}>
            {/* Free Plan */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2" align="center">
                    Free
                  </Typography>
                  <Typography variant="h4" align="center" color="primary" gutterBottom>
                    AED 0
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
                    per month
                  </Typography>
                  <Box sx={{ my: 3 }}>
                    <Typography paragraph>
                      • Access to 1 industry simulation
                    </Typography>
                    <Typography paragraph>
                      • Basic AI supervisor feedback
                    </Typography>
                    <Typography paragraph>
                      • Limited task assignments
                    </Typography>
                    <Typography paragraph>
                      • No certificate included
                    </Typography>
                  </Box>
                </CardContent>
                <Box p={2} pt={0} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="outlined" color="primary" component={Link} to="/register">
                    Get Started
                  </Button>
                </Box>
              </Card>
            </Grid>
            
            {/* Premium Plan */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                border: '2px solid #3f51b5',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2" align="center">
                    Premium
                  </Typography>
                  <Typography variant="h4" align="center" color="primary" gutterBottom>
                    AED 30
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
                    per month
                  </Typography>
                  <Box sx={{ my: 3 }}>
                    <Typography paragraph>
                      • Access to all industry simulations
                    </Typography>
                    <Typography paragraph>
                      • Advanced AI supervisor feedback
                    </Typography>
                    <Typography paragraph>
                      • Unlimited task assignments
                    </Typography>
                    <Typography paragraph>
                      • Verified certificate included
                    </Typography>
                  </Box>
                </CardContent>
                <Box p={2} pt={0} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="contained" color="primary" component={Link} to="/register">
                    Sign Up Now
                  </Button>
                </Box>
              </Card>
            </Grid>
            
            {/* Enterprise Plan */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2" align="center">
                    Enterprise
                  </Typography>
                  <Typography variant="h4" align="center" color="primary" gutterBottom>
                    Custom
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
                    annual license
                  </Typography>
                  <Box sx={{ my: 3 }}>
                    <Typography paragraph>
                      • White-labeled platform
                    </Typography>
                    <Typography paragraph>
                      • Custom industry simulations
                    </Typography>
                    <Typography paragraph>
                      • Analytics dashboard
                    </Typography>
                    <Typography paragraph>
                      • Branded certificates
                    </Typography>
                  </Box>
                </CardContent>
                <Box p={2} pt={0} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="outlined" color="primary">
                    Contact Us
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box py={6} sx={{ bgcolor: '#3f51b5', color: 'white' }}>
        <Container>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={8} textAlign="center">
              <Typography variant="h4" gutterBottom>
                Ready to gain valuable work experience?
              </Typography>
              <Typography variant="h6" paragraph>
                Start your virtual internship journey today!
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                component={Link}
                to="/register"
                sx={{ mt: 2 }}
              >
                Get Started Now
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;

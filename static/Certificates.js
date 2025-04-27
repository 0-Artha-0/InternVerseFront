import React from 'react';
import { Box, Typography, Container, Grid, Paper, Card, CardContent, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const CertificateCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

const Certificates = () => {
  // Mock data for certificates
  const certificates = [
    {
      id: 1,
      title: 'Software Development Internship',
      company: 'CodeCraft',
      issueDate: '2025-03-15',
      certificateId: 'CERT-SD-2025-001',
      skills: ['JavaScript', 'React', 'Node.js', 'API Development', 'Git'],
    },
    {
      id: 2,
      title: 'Data Analysis Fundamentals',
      company: 'FinTech Solutions',
      issueDate: '2025-02-10',
      certificateId: 'CERT-DA-2025-042',
      skills: ['Data Visualization', 'SQL', 'Excel', 'Statistical Analysis', 'Reporting'],
    }
  ];

  return (
    <Box className="page-container">
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          My Certificates
        </Typography>
        <Typography variant="body1" paragraph>
          View and share your earned virtual internship certificates. Each certificate represents the skills and experience you've gained through completing our AI-powered internship simulations.
        </Typography>
        
        {certificates.length > 0 ? (
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {certificates.map((certificate) => (
              <Grid item xs={12} md={6} key={certificate.id}>
                <CertificateCard elevation={3}>
                  <CardContent>
                    <Box sx={{ 
                      border: '2px solid #3f51b5', 
                      p: 3, 
                      textAlign: 'center',
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url("/certificate-bg.png")',
                      backgroundSize: 'cover',
                      mb: 3
                    }}>
                      <Typography variant="h5" component="div" gutterBottom sx={{ color: '#3f51b5', fontWeight: 'bold' }}>
                        Certificate of Completion
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        This certifies that
                      </Typography>
                      <Typography variant="h6" gutterBottom sx={{ fontStyle: 'italic', my: 2 }}>
                        Sarah Johnson
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        has successfully completed the
                      </Typography>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', my: 2 }}>
                        {certificate.title}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        at {certificate.company}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                        Issued on {certificate.issueDate} • Certificate ID: {certificate.certificateId}
                      </Typography>
                    </Box>
                    
                    <Typography variant="subtitle1" gutterBottom>
                      Skills Acquired:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                      {certificate.skills.map((skill, index) => (
                        <Box 
                          key={index} 
                          sx={{ 
                            bgcolor: '#e3f2fd', 
                            color: '#1976d2', 
                            px: 1.5, 
                            py: 0.5, 
                            borderRadius: 1,
                            fontSize: '0.875rem'
                          }}
                        >
                          {skill}
                        </Box>
                      ))}
                    </Box>
                    
                    <Divider sx={{ mb: 2 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button variant="outlined" color="primary">
                        Download PDF
                      </Button>
                      <Button variant="contained" color="primary">
                        Share Certificate
                      </Button>
                    </Box>
                  </CardContent>
                </CertificateCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          <StyledPaper elevation={2} sx={{ textAlign: 'center', py: 5, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              No Certificates Yet
            </Typography>
            <Typography variant="body1" paragraph>
              Complete an internship simulation to earn your first certificate.
            </Typography>
            <Button variant="contained" color="primary">
              Explore Internships
            </Button>
          </StyledPaper>
        )}
        
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Verify a Certificate
          </Typography>
          <Typography variant="body1" paragraph>
            Employers can verify the authenticity of your certificates using the certificate ID.
          </Typography>
          <StyledPaper elevation={2} sx={{ p: 3 }}>
            <Typography variant="body1" gutterBottom>
              To verify a certificate, enter the Certificate ID:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <input
                  type="text"
                  placeholder="e.g., CERT-SD-2025-001"
                  style={{ 
                    width: '100%', 
                    padding: '10px', 
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                />
              </Box>
              <Button variant="contained" color="primary">
                Verify
              </Button>
            </Box>
          </StyledPaper>
        </Box>
      </Container>
    </Box>
  );
};

export default Certificates;

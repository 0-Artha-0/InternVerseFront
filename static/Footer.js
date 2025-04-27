import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: 'white',
  padding: theme.spacing(4, 0),
  marginTop: 'auto',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: 'white',
  marginRight: theme.spacing(3),
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'center', md: 'flex-start' } }}>
          <Box sx={{ mb: { xs: 3, md: 0 }, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h6" gutterBottom>
              VirtualIntern
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: 400 }}>
              AI-powered virtual internship platform helping students gain real-world experience through simulated work environments.
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
            <Typography variant="subtitle1" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center', sm: 'flex-start' }, gap: { xs: 1, sm: 2 } }}>
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/industries">Industries</FooterLink>
              <FooterLink href="/login">Login</FooterLink>
              <FooterLink href="/register">Register</FooterLink>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid rgba(255,255,255,0.2)', textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} VirtualIntern. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;

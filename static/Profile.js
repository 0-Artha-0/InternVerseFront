import React from 'react';
import { Box, Typography, Avatar, Paper, Grid, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import mockData from '../services/mockData';

const ProfileBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(2)
}));

const Profile = () => {
  const user = mockData.currentUser;

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ProfileBox>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar 
                src={user.profilePicture || ''} 
                alt={`${user.firstName} ${user.lastName}`}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Typography variant="h5">{`${user.firstName} ${user.lastName}`}</Typography>
              <Typography variant="body1" color="textSecondary">{user.email}</Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                sx={{ mt: 2 }}
              >
                Edit Profile
              </Button>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">Subscription</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {user.subscriptionTier === 'premium' ? 'Premium Plan' : 'Basic Plan'}
              </Typography>
              
              {user.subscriptionTier !== 'premium' && (
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  Upgrade to Premium
                </Button>
              )}
            </Box>
          </ProfileBox>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <ProfileBox>
            <Typography variant="h6" gutterBottom>Personal Information</Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">University</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{user.university}</Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Major</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{user.major}</Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Graduation Year</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{user.graduationYear}</Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Account Type</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {user.accountType === 'student' ? 'Student' : 
                   user.accountType === 'corporate_partner' ? 'Corporate Partner' : 
                   user.accountType === 'university_admin' ? 'University Admin' : 
                   'System Admin'}
                </Typography>
              </Grid>
            </Grid>
            
            <Button 
              variant="outlined" 
              color="primary" 
              sx={{ mt: 2 }}
            >
              Update Information
            </Button>
          </ProfileBox>
          
          <ProfileBox>
            <Typography variant="h6" gutterBottom>Account Settings</Typography>
            
            <Button 
              variant="outlined" 
              color="primary" 
              sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}
            >
              Change Password
            </Button>
            
            <Button 
              variant="outlined" 
              color="error"
            >
              Delete Account
            </Button>
          </ProfileBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;

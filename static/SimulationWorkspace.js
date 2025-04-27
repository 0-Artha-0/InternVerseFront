import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Paper, Tabs, Tab, Divider, TextField, Button, Avatar, List, ListItem, ListItemText, ListItemAvatar, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ChatIcon from '@mui/icons-material/Chat';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const ChatMessage = styled(Box)(({ theme, isAi }) => ({
  display: 'flex',
  marginBottom: theme.spacing(2),
  justifyContent: isAi ? 'flex-start' : 'flex-end',
}));

const MessageBubble = styled(Box)(({ theme, isAi }) => ({
  maxWidth: '70%',
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.spacing(2),
  backgroundColor: isAi ? theme.palette.grey[100] : theme.palette.primary.main,
  color: isAi ? theme.palette.text.primary : theme.palette.primary.contrastText,
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const SimulationWorkspace = () => {
  const [tabValue, setTabValue] = useState(0);
  const [message, setMessage] = useState('');
  
  // Mock data
  const internshipDetails = {
    title: 'Marketing Internship',
    company: 'TechStart',
    supervisor: 'AI Marketing Mentor',
    progress: 65,
    currentWeek: 3,
    totalWeeks: 6,
  };
  
  const currentTask = {
    id: 1,
    title: 'Prepare Social Media Campaign',
    description: 'Create a comprehensive social media campaign for the launch of our new product "TechGadget Pro". Include target audience analysis, content strategy, posting schedule, and success metrics.',
    dueDate: '2025-04-25',
    status: 'in-progress',
  };
  
  const chatMessages = [
    { id: 1, sender: 'ai', content: 'Hello Sarah! Welcome to your Marketing Internship. I\'m your AI supervisor. How can I help you today?' },
    { id: 2, sender: 'user', content: 'Hi! I\'m working on the social media campaign task. Can you give me some tips on how to start?' },
    { id: 3, sender: 'ai', content: 'Great question! For a social media campaign, I recommend starting with audience research. Who is the target demographic for TechGadget Pro? Once you understand your audience, you can determine which platforms they use most and what content would resonate with them.' },
    { id: 4, sender: 'user', content: 'That makes sense. The product is a high-end tech gadget, so I think we should target tech enthusiasts and early adopters.' },
    { id: 5, sender: 'ai', content: 'Excellent insight! Tech enthusiasts and early adopters often frequent platforms like Twitter, Reddit, and YouTube. Consider creating teaser content that highlights the innovative features of TechGadget Pro. Would you like me to provide some examples of successful tech product launch campaigns for inspiration?' },
  ];
  
  const previousTasks = [
    { id: 101, title: 'Market Research Report', status: 'completed', grade: 'A', feedback: 'Excellent analysis of market trends and competitor positioning.' },
    { id: 102, title: 'Brand Positioning Strategy', status: 'completed', grade: 'B+', feedback: 'Good strategic thinking, but could use more specific differentiation points.' },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box className="page-container">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* Left Sidebar - Internship Details */}
          <Grid item xs={12} md={3}>
            <StyledPaper elevation={3}>
              <Typography variant="h6" gutterBottom>
                {internshipDetails.title}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                {internshipDetails.company}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="body2" gutterBottom>
                AI Supervisor: {internshipDetails.supervisor}
              </Typography>
              
              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Overall Progress: {internshipDetails.progress}%
                </Typography>
                <Box sx={{ width: '100%', bgcolor: '#e0e0e0', borderRadius: 1, height: 8 }}>
                  <Box 
                    sx={{ 
                      width: `${internshipDetails.progress}%`, 
                      bgcolor: 'primary.main', 
                      borderRadius: 1, 
                      height: 8 
                    }} 
                  />
                </Box>
              </Box>
              
              <Typography variant="body2" gutterBottom>
                Week {internshipDetails.currentWeek} of {internshipDetails.totalWeeks}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" gutterBottom>
                Previous Tasks:
              </Typography>
              <List dense>
                {previousTasks.map((task) => (
                  <ListItem key={task.id} sx={{ px: 0 }}>
                    <ListItemText 
                      primary={task.title} 
                      secondary={`Grade: ${task.grade}`} 
                    />
                  </ListItem>
                ))}
              </List>
            </StyledPaper>
          </Grid>
          
          {/* Main Content Area */}
          <Grid item xs={12} md={9}>
            <StyledPaper elevation={3}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="workspace tabs">
                  <Tab icon={<AssignmentIcon />} label="Current Task" />
                  <Tab icon={<ChatIcon />} label="AI Supervisor" />
                  <Tab icon={<FeedbackIcon />} label="Feedback" />
                </Tabs>
              </Box>
              
              {/* Current Task Tab */}
              <TabPanel value={tabValue} index={0}>
                <Typography variant="h5" gutterBottom>
                  {currentTask.title}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Due: {currentTask.dueDate}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="body1" paragraph>
                  {currentTask.description}
                </Typography>
                
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Task Requirements:
                </Typography>
                <Typography variant="body1" component="div">
                  <ul>
                    <li>Identify target audience demographics and psychographics</li>
                    <li>Select appropriate social media platforms for the campaign</li>
                    <li>Create a content calendar with at least 10 post ideas</li>
                    <li>Define KPIs and success metrics for the campaign</li>
                    <li>Propose a budget allocation across platforms</li>
                  </ul>
                </Typography>
                
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Resources:
                </Typography>
                <Typography variant="body1" component="div">
                  <ul>
                    <li>TechGadget Pro product specifications</li>
                    <li>Company brand guidelines</li>
                    <li>Previous campaign performance data</li>
                    <li>Market research report (from your previous task)</li>
                  </ul>
                </Typography>
                
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Submit Your Work:
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    placeholder="Enter your submission here or upload a file..."
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="outlined">
                      Upload File
                    </Button>
                    <Button variant="contained" color="primary">
                      Submit Task
                    </Button>
                  </Box>
                </Box>
              </TabPanel>
              
              {/* AI Supervisor Chat Tab */}
              <TabPanel value={tabValue} index={1}>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '70vh' }}>
                  <Box sx={{ flexGrow: 1, overflow: 'auto', mb: 2 }}>
                    {chatMessages.map((msg) => (
                      <ChatMessage key={msg.id} isAi={msg.sender === 'ai'}>
                        {msg.sender === 'ai' && (
                          <Avatar sx={{ mr: 1, bgcolor: 'primary.main' }}>AI</Avatar>
                        )}
                        <MessageBubble isAi={msg.sender === 'ai'}>
                          <Typography variant="body1">{msg.content}</Typography>
                        </MessageBubble>
                        {msg.sender !== 'ai' && (
                          <Avatar sx={{ ml: 1, bgcolor: 'secondary.main' }}>S</Avatar>
                        )}
                      </ChatMessage>
                    ))}
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      fullWidth
                      placeholder="Type your message here..."
                      variant="outlined"
                      value={message}
                      onChange={handleMessageChange}
                      onKeyPress={handleKeyPress}
                      sx={{ mr: 1 }}
                    />
                    <Button 
                      variant="contained" 
                      color="primary" 
                      endIcon={<SendIcon />}
                      onClick={handleSendMessage}
                    >
                      Send
                    </Button>
                  </Box>
                </Box>
              </TabPanel>
              
              {/* Feedback Tab */}
              <TabPanel value={tabValue} index={2}>
                <Typography variant="h5" gutterBottom>
                  Task Feedback
                </Typography>
                
                {previousTasks.map((task) => (
                  <Card key={task.id} sx={{ mb: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {task.title}
                      </Typography>
                      <Typography variant="subtitle1" color="primary" gutterBottom>
                        Grade: {task.grade}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="subtitle2" gutterBottom>
                        AI Supervisor Feedback:
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {task.feedback}
                      </Typography>
                      
                      <Typography variant="subtitle2" gutterBottom>
                        Strengths:
                      </Typography>
                      <Typography variant="body1" component="div">
                        <ul>
                          <li>Thorough research and data analysis</li>
                          <li>Clear presentation of findings</li>
                          <li>Actionable recommendations</li>
                        </ul>
                      </Typography>
                      
                      <Typography variant="subtitle2" gutterBottom>
                        Areas for Improvement:
                      </Typography>
                      <Typography variant="body1" component="div">
                        <ul>
                          <li>Consider including more visual elements</li>
                          <li>Expand on competitive analysis section</li>
                          <li>Provide more specific implementation steps</li>
                        </ul>
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </TabPanel>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SimulationWorkspace;

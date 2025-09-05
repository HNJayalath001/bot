import React, { useState } from 'react';
import { Container, Paper, Box, TextField, Button, List, ListItem, ListItemText, Typography, Avatar, ListItemAvatar } from '@mui/material';
import questionsData from './questions.json';
import User from './image/user.png';
import Bot from './image/bot.jpg';
import HospitalLogo from './image/HospitalLogo.png';
import Background from './image/health.jpg';

function App() {
 
  const [input, setInput] = useState(''); 
  const [messages, setMessages] = useState([]); 

 
  const handleSend = () => {
   
    if (input.trim()) {
      
      const question = input.trim().toLowerCase();
      const matchedQuestion = questionsData.questions.find(q => q.question.toLowerCase() === question);
      const answer = matchedQuestion ? matchedQuestion.answer : "Sorry, I don't understand that question.";
      
      
      setMessages([...messages, { type: 'user', text: input }, { type: 'bot', text: answer }]);
      
     
      setInput('');
    }
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ p: 0, m: 0, width: '100vw', minHeight: '100vh' }}>

      <Paper
        elevation={3}
        sx={{
          p: { xs: 0.5, sm: 2 },
          borderRadius: { xs: 0, sm: 2 },
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover',
          width: '100vw',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
       
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: { xs: 1, sm: 2 },
            width: '100%',
            pt: { xs: 1, sm: 2 },
          }}
        >
          <Avatar alt="Hospital Logo" src={HospitalLogo} sx={{ mr: 2, width: { xs: 32, sm: 48 }, height: { xs: 32, sm: 48 } }} />
          <Typography variant={window.innerWidth < 600 ? 'subtitle1' : 'h6'} align="center">
            Care Connect Pro Bot
          </Typography>
        </Box>
   
        <Box
          sx={{
            flex: 1,
            width: { xs: '100%', sm: '80%', md: '60%' },
            maxWidth: 600,
            maxHeight: { xs: '55vh', sm: '70vh' },
            overflowY: 'auto',
            mb: { xs: 1, sm: 2 },
            p: { xs: 0.5, sm: 1 },
            bgcolor: 'rgba(227, 230, 96, 0.8)',
            borderRadius: 2,
            alignSelf: 'center',
          }}
        >
          <List>
          
            {messages.map((message, index) => (
              <ListItem
                key={index}
                sx={{
                  justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                  px: { xs: 0.5, sm: 2 },
                }}
              >
                {message.type === 'bot' && (
                  <ListItemAvatar>
                    <Avatar alt="Bot" src={Bot} sx={{ width: { xs: 28, sm: 40 }, height: { xs: 28, sm: 40 } }} />
                  </ListItemAvatar>
                )}
                <ListItemText
                  primary={message.text}
                  sx={{
                    bgcolor: message.type === 'user' ? '#d1e7dd' : '#f8d7da',
                    borderRadius: 2,
                    p: { xs: 0.5, sm: 1 },
                    maxWidth: { xs: '85vw', sm: '75%' },
                    textAlign: message.type === 'user' ? 'right' : 'left',
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                  }}
                />
                {message.type === 'user' && (
                  <ListItemAvatar>
                    <Avatar alt="User" src={User} sx={{ width: { xs: 28, sm: 40 }, height: { xs: 28, sm: 40 } }} />
                  </ListItemAvatar>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
       
        <Box
          sx={{
            display: 'flex',
            borderTop: 1,
            borderColor: 'divider',
            width: { xs: '100%', sm: '80%', md: '60%' },
            maxWidth: 600,
            alignSelf: 'center',
            p: { xs: 0.5, sm: 1 },
            bgcolor: 'rgba(255,255,255,0.7)',
            borderRadius: 2,
            mb: { xs: 1, sm: 0 },
          }}
        >
       
          <TextField
            fullWidth
            variant="outlined"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything...(e.g., 'What is depression ')"
            sx={{
              mr: 1.5,
              '::placeholder': { color: 'black' },
              fontSize: { xs: '0.95rem', sm: '1rem' },
            }}
            inputProps={{ style: { padding: window.innerWidth < 600 ? 8 : 16 } }}
          />
     
          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            sx={{ minWidth: { xs: 60, sm: 100 }, fontSize: { xs: '0.95rem', sm: '1rem' } }}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default App;

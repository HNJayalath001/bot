import React, { useState } from 'react';
import { Container, Paper, Box, TextField, Button, List, ListItem, ListItemText, Typography, Avatar, ListItemAvatar } from '@mui/material';
import questionsData from './questions.json';
import User from './image/user.png';
import Bot from './image/bot.jpg';
import HospitalLogo from './image/HospitalLogo.png';
import Background from './image/health.jpg';

function App() {
  // State for user input and chat messages
  const [input, setInput] = useState(''); // State to store user input
  const [messages, setMessages] = useState([]); // State to store chat messages

  // Function to handle sending messages
  const handleSend = () => {
    // Check if input is not empty
    if (input.trim()) {
      // Process user input
      const question = input.trim().toLowerCase();
      const matchedQuestion = questionsData.questions.find(q => q.question.toLowerCase() === question);
      const answer = matchedQuestion ? matchedQuestion.answer : "I have no idea about this question.";
      
      // Update messages state with user input and bot response
      setMessages([...messages, { type: 'user', text: input }, { type: 'bot', text: answer }]);
      
      // Clear input field after sending message
      setInput('');
    }
  };

  return (
    <Container maxWidth={false} sx={{ p: 0, m: 0 }}>
      {/* Chat container */}
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2, backgroundImage: `url(${Background})`, backgroundSize: 'cover', width: '100vw', height: '100vh' }}>
        {/* Chat title */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Avatar alt="Hospital Logo" src={HospitalLogo} sx={{ mr: 2 }} />
          <Typography variant="h6" align="center">
            Care Connect Pro Bot
          </Typography>
        </Box>
        {/* Chat messages */}
        <Box sx={{ maxHeight: '70vh', overflowY: 'auto', mb: 2, p: 1, bgcolor: 'rgba(227, 230, 96, 0.8)', borderRadius: 2 }}>
          <List>
            {/* Displaying chat messages */}
            {messages.map((message, index) => (
              <ListItem key={index} sx={{ justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start' }}>
                {message.type === 'bot' && (
                  <ListItemAvatar>
                    <Avatar alt="Bot" src={Bot} />
                  </ListItemAvatar>
                )}
                <ListItemText
                  primary={message.text}
                  sx={{
                    bgcolor: message.type === 'user' ? '#d1e7dd' : '#f8d7da',
                    borderRadius: 2,
                    p: 1,
                    maxWidth: '75%',
                    textAlign: message.type === 'user' ? 'right' : 'left',
                  }}
                />
                {message.type === 'user' && (
                  <ListItemAvatar>
                    <Avatar alt="User" src={User} />
                  </ListItemAvatar>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
        {/* Input field and send button */}
        <Box sx={{ display: 'flex', borderTop: 1, borderColor: 'divider' }}>
          {/* Input field for typing messages */}
          <TextField
            fullWidth
            variant="outlined"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            sx={{ mr: 1.5, '::placeholder': { color: 'black' } }}
          />
          {/* Button to send messages */}
          <Button variant="contained" color="primary" onClick={handleSend}>
            Send
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default App;

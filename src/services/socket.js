const io = require('socket.io-client');

const socket = io('http://localhost:5000/', {
  extraHeaders: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBmYzdmNzFiYzhmNWU2ZWJmYWQ1YjMiLCJmaXJzdG5hbWUiOiJhZG1pbiIsImxhc3RuYW1lIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluMTI3IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpc1ZlcmlmaWVkIjp0cnVlLCJpYXQiOjE3MTI1NDkwODIsImV4cCI6MTcxMjYzNTQ4Mn0.-0EYGKalP52xVaV4SrV4HBnfBKUhGAGyQ6mRl3GRylA',
  },
});

socket.on('connect', () => {
  console.log('Connected to Socket Server');
});

socket.on('connect_error', (error) => {
  if (socket.active) {
    console.log('connected');
  } else {
    console.log(error.message);
  }
});

socket.on('disconnect', () => {
  console.log('Disconnected from Socket Server');
});

socket.on('new-post', (data) => {
  console.log('New post received:', data);
});

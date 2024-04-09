const io = require('socket.io-client');

const { getCookie } = require('./cookieManager');

export const socket = io('http://localhost:5000/', {
  extraHeaders: {
    token: getCookie(),
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

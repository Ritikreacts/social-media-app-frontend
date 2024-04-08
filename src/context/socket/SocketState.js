import React, { useContext, useState } from 'react';

import PropTypes from 'prop-types';

import SocketContext from './SocketContext.js';
import AuthContext from '../auth/AuthContext.js';

const io = require('socket.io-client');
const SocketState = (props) => {
  const [newPost, setNewPost] = useState(null);
  const token = useContext(AuthContext);
  const socket = io('http://localhost:5000/', {
    extraHeaders: {
      token: token.activeUserId,
    },
  });
  socket.on('connect', () => {
    console.log('Connected to Socket Server');
  });
  socket.on('disconnect', () => {
    console.log('Disconnected from Socket Server');
  });
  socket.on('connect_error', (error) => {
    if (socket.active) {
      console.log('connected');
    } else {
      console.log(error.message);
    }
  });
  socket.on('new-post', (data) => {
    setNewPost(data);
  });

  return (
    <SocketContext.Provider value={(socket, newPost)}>
      {props.children}
    </SocketContext.Provider>
  );
};

SocketState.propTypes = {
  children: PropTypes.object.isRequired,
};

export default SocketState;

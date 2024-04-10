import { useContext } from 'react';

import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import AuthContext from './../../context/auth/AuthContext';
import { connectToSocket } from '../socket';

const PrivateAuth = ({ children }) => {
  const state = useContext(AuthContext);
  const isLoggedIn = state.activeUserId;
  connectToSocket(isLoggedIn); //connected with web socket
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return children;
};
PrivateAuth.propTypes = {
  children: PropTypes.object.isRequired,
};

export default PrivateAuth;

import { useContext } from 'react';

import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import AuthContext from './../../context/auth/AuthContext';

const PrivateAuth = ({ children }) => {
  const state = useContext(AuthContext);
  const isLoggedIn = state.activeUserId;

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return children;
};
PrivateAuth.propTypes = {
  children: PropTypes.object.isRequired,
};

export default PrivateAuth;

import { useContext } from 'react';

import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import AuthContext from './../../context/auth/AuthContext';

const PublicAuth = ({ children }) => {
  const state = useContext(AuthContext);
  const isLoggedIn = state.activeUserId;

  if (isLoggedIn) {
    return <Navigate to="/home/feed" />;
  }
  return children;
};
PublicAuth.propTypes = {
  children: PropTypes.object.isRequired,
};
export default PublicAuth;

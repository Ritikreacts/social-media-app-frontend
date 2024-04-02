import { useContext } from 'react';

import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import AuthContext from './../../context/AuthContext';

const PublicAuth = ({ children }) => {
  console.log('Public auth');
  const state = useContext(AuthContext);
  const isLoggedIn = state.activeUserId;

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }
  return children;
};
PublicAuth.propTypes = {
  children: PropTypes.object.isRequired,
};
export default PublicAuth;

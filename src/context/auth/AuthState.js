import React, { useState } from 'react';

import PropTypes from 'prop-types';

import AuthContext from './AuthContext';
import {
  clearCookie,
  getCookie,
  setCookie,
} from '../../services/cookieManager';

const AuthState = (props) => {
  const [activeUserId, setActiveUserId] = useState(getCookie);

  const handleLogIn = (accessToken) => {
    setActiveUserId(accessToken);
    setCookie(accessToken);
  };

  const handleLogOut = () => {
    setActiveUserId(null);
    clearCookie();
  };

  return (
    <AuthContext.Provider value={{ handleLogIn, handleLogOut, activeUserId }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
AuthState.propTypes = {
  children: PropTypes.object.isRequired,
};

import React, { useState } from 'react';

import PropTypes from 'prop-types';

import AuthContext from './AuthContext';
import { getCookie } from '../../services/cookieManager';

const AuthState = (props) => {
  const [activeUserId, setActiveUserId] = useState(getCookie);
  return (
    <AuthContext.Provider value={{ activeUserId, setActiveUserId }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
AuthState.propTypes = {
  children: PropTypes.object.isRequired,
};

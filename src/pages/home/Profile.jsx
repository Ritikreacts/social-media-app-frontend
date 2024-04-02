import React from 'react';

import { Avatar } from '@mui/material';

import { useFetchUserQuery } from '../../api/action-apis/userApi';

const Profile = () => {
  const { data, isLoading } = useFetchUserQuery();
  const activeUserDetails = !isLoading && data.data;
  console.log(activeUserDetails);
  return (
    <div className="feed-box">
      <Avatar />
    </div>
  );
};

export default Profile;

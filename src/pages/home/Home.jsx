import React from 'react';

import { Outlet } from 'react-router-dom';

import Navbar from '../../component/Navbar';

const Home = () => {
  return (
    <>
      <div className="container">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default Home;

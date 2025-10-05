// src/layout/MainLayout.jsx
import React from 'react';
import Hero from '../components/Hero';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <Hero />
      <Outlet />
    </div>
  );
};

export default MainLayout;

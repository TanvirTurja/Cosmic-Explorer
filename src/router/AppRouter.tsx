import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../view/Home';
import CosmicDashboard from '../components/CosmicDashboard';
import { DashboardProvider } from '../context/DashboardContext';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/explorer" element={
          <DashboardProvider>
            <CosmicDashboard />
          </DashboardProvider>
        } />
      </Routes>
    </Router>
  );
};

export default AppRouter;

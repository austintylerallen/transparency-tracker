import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000); // Display welcome message for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="app-container">
        {showWelcome ? (
          <div className="welcome-message">Welcome to Clarity</div>
        ) : (
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Login />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;

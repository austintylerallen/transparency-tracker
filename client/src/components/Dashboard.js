import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import UserProfile from './UserProfile';
import Representatives from './Representatives';
import Legislation from './Legislation';
import NewsFeed from './NewsFeed';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <a href="#profile">Profile</a>
        <a href="#representatives">Representatives</a>
        <a href="#legislation">Legislation</a>
        <a href="#news">News</a>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </nav>
      <div id="profile" className="section">
        <UserProfile />
      </div>
      <div id="representatives" className="section">
        <Representatives />
      </div>
      <div id="legislation" className="section">
        <Legislation />
      </div>
      <div id="news" className="section">
        <NewsFeed />
      </div>
    </div>
  );
};

export default Dashboard;

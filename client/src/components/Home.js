import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowWelcome(false);
    }, 3000); // Display welcome message for 3 seconds
  }, []);

  return (
    <div className="home-container">
      {showWelcome ? (
        <div className="welcome-message">Welcome to Clarity</div>
      ) : (
        <div className="login-form">
          <h2>Login to your account</h2>
          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
          <p>Not a member? <Link to="/register">Register now</Link></p>
        </div>
      )}
    </div>
  );
};

export default Home;

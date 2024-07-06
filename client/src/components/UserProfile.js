import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_USER_PROFILE = gql`
  query me {
    me {
      id
      username
      email
      profilePicture
    }
  }
`;

const UPDATE_USER_PROFILE = gql`
  mutation updateProfile($username: String, $email: String, $password: String) {
    updateProfile(username: $username, email: $email, password: $password) {
      id
      username
      email
      profilePicture
    }
  }
`;

const UserProfile = () => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE);
  const [updateProfile] = useMutation(UPDATE_USER_PROFILE);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  useEffect(() => {
    if (data && data.me) {
      setFormData({
        username: data.me.username,
        email: data.me.email,
        password: ''
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ variables: { ...formData } });
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      <div className="profile-picture">
        <img src={data.me.profilePicture || '/client/public/default-profile-photo.jpg'} alt="Profile" />
      </div>
      <div className="personal-info">
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </label>
          <button type="submit">Update Profile</button>
        </form>
      </div>
      <div className="activity-summary">
        <h3>Activity Summary</h3>
        <p>Recent activities will be displayed here.</p>
      </div>
    </div>
  );
};

export default UserProfile;

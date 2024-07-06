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
  const [editMode, setEditMode] = useState({ username: false, email: false, password: false });

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
      setEditMode({ username: false, email: false, password: false });
    } catch (err) {
      console.error('Error updating profile:', err.message);
    }
  };

  const toggleEditMode = (field) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      <div className="profile-picture">
        <img src={data.me.profilePicture || '/assets/images/default-profile-photo.jpg'} alt="Profile" />
      </div>
      <div className="personal-info">
        <div className="info-section">
          <div className="info-header">
            <h3>Username</h3>
            <button onClick={() => toggleEditMode('username')} className="edit-button">
              {editMode.username ? 'Cancel' : 'Edit'}
            </button>
          </div>
          {editMode.username ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          ) : (
            <p>{formData.username}</p>
          )}
        </div>
        <div className="info-section">
          <div className="info-header">
            <h3>Email</h3>
            <button onClick={() => toggleEditMode('email')} className="edit-button">
              {editMode.email ? 'Cancel' : 'Edit'}
            </button>
          </div>
          {editMode.email ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          ) : (
            <p>{formData.email}</p>
          )}
        </div>
        <div className="info-section">
          <div className="info-header">
            <h3>Password</h3>
            <button onClick={() => toggleEditMode('password')} className="edit-button">
              {editMode.password ? 'Cancel' : 'Edit'}
            </button>
          </div>
          {editMode.password ? (
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          ) : (
            <p>********</p>
          )}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!editMode.username && !editMode.email && !editMode.password}
        >
          Update Profile
        </button>
      </div>
      <div className="activity-summary">
        <h3>Activity Summary</h3>
        <p>Recent activities will be displayed here.</p>
      </div>
    </div>
  );
};

export default UserProfile;

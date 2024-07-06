const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  profilePicture: {
    type: String,
    default: 'default-profile-photo.jpg', // Provide a default URL for the profile picture
  },
});

module.exports = mongoose.model('User', UserSchema);

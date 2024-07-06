const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

const resolvers = {
  Query: {
    users: async () => await User.find(),
    me: async (_, __, { user }) => {
      console.log('User in me resolver:', user);
      if (!user) throw new Error('You are not authenticated');
      return await User.findById(user.id);
    },
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      let user = await User.findOne({ email });
      if (user) {
        throw new Error('User already exists');
      }

      user = new User({ username, email, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return { ...user._doc, id: user._id, token };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return { ...user._doc, id: user._id, token };
    },
    updateProfile: async (_, { username, email, password }, { user }) => {
      console.log('User in updateProfile resolver:', user);
      if (!user) throw new Error('You are not authenticated');

      const updatedUser = await User.findById(user.id);

      if (username) updatedUser.username = username;
      if (email) updatedUser.email = email;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        updatedUser.password = await bcrypt.hash(password, salt);
      }

      await updatedUser.save();
      return updatedUser;
    },
  },
};

module.exports = resolvers;

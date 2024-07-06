require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const startServer = async () => {
  const app = express();

  // Connect Database
  connectDB();

  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200, // For legacy browser support
  };

  app.use(cors(corsOptions));

  const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log('Token in authMiddleware:', token);
    if (token) {
      try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        console.log('Decoded user:', decoded);
        req.user = decoded;
      } catch (err) {
        console.error('Token error:', err);
      }
    }
    next();
  };

  app.use(express.json());
  app.use(authMiddleware);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      console.log('User in context:', req.user);
      return { user: req.user };
    },
  });

  await server.start();
  server.applyMiddleware({ app, cors: false });

  const PORT = process.env.PORT || 5003;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}${server.graphqlPath}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
});

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    profilePicture: String
    token: String
  }

  type Query {
    users: [User]
    me: User
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    updateProfile(username: String, email: String, password: String): User
  }
`;

module.exports = typeDefs;

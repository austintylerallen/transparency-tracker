import React from 'react';
import { useQuery, gql } from '@apollo/client';

const TEST_QUERY = gql`
  query {
    users {
      id
      username
      email
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(TEST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Users:</h1>
      <ul>
        {data.users.map(user => (
          <li key={user.id}>{user.username} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default App;

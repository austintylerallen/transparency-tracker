import React, { useEffect, useState } from 'react';
import { getMembersOfCongress } from '../services/api';
import './MembersOfCongress.css';

const MembersOfCongress = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getMembersOfCongress();
        setMembers(data.members);
      } catch (err) {
        setError('Failed to fetch members of Congress. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="members-container">
      <h2>Members of Congress</h2>
      <ul>
        {members.map((member, index) => (
          <li key={index}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MembersOfCongress;

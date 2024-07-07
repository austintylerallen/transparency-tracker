import React, { useState, useEffect } from 'react';
import { getMemberSponsoredLegislation, getMemberCosponsoredLegislation } from '../services/api';

const MemberLegislation = ({ bioguideId }) => {
  const [sponsored, setSponsored] = useState([]);
  const [cosponsored, setCosponsored] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLegislation = async () => {
      try {
        const sponsoredData = await getMemberSponsoredLegislation(bioguideId);
        setSponsored(sponsoredData.results || []);
        const cosponsoredData = await getMemberCosponsoredLegislation(bioguideId);
        setCosponsored(cosponsoredData.results || []);
      } catch (err) {
        setError('Failed to fetch legislation.');
      }
    };

    fetchLegislation();
  }, [bioguideId]);

  if (error) return <p>{error}</p>;

  return (
    <div className="legislation-container">
      <h2>Sponsored Legislation</h2>
      {sponsored.length === 0 ? <p>Loading...</p> : (
        <ul>
          {sponsored.map((bill) => (
            <li key={bill.billId}>
              <p>Bill: {bill.title}</p>
              <p>Status: {bill.latestAction}</p>
            </li>
          ))}
        </ul>
      )}
      <h2>Cosponsored Legislation</h2>
      {cosponsored.length === 0 ? <p>Loading...</p> : (
        <ul>
          {cosponsored.map((bill) => (
            <li key={bill.billId}>
              <p>Bill: {bill.title}</p>
              <p>Status: {bill.latestAction}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MemberLegislation;

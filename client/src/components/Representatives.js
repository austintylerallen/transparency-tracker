import React, { useState, useCallback } from 'react';
import { getRepresentativesByAddress, getAddressFromCoords } from '../services/api';
import './Representatives.css';

const Representatives = () => {
  const [address, setAddress] = useState('');
  const [representatives, setRepresentatives] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchRepresentatives = async (userAddress) => {
    try {
      const data = await getRepresentativesByAddress(userAddress);
      setRepresentatives(data.officials);
      setError(null);
      setCurrentPage(1); // Reset to the first page on new search
    } catch (err) {
      setError('Failed to fetch representatives. Please try again.');
    }
  };

  const fetchAddressFromCoords = useCallback(async (latitude, longitude) => {
    try {
      const data = await getAddressFromCoords(latitude, longitude);
      if (data.results && data.results[0]) {
        const userAddress = data.results[0].formatted_address;
        setAddress(userAddress);
        fetchRepresentatives(userAddress);
      } else {
        setError('Unable to determine address from location. Please enter your address manually.');
      }
    } catch (error) {
      console.error('Error fetching address from coordinates:', error);
      setError('Could not fetch address from coordinates. Please enter your address manually.');
    }
  }, []);

  const handleGeolocation = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchAddressFromCoords(latitude, longitude);
        },
        (error) => {
          console.error('Error fetching geolocation:', error);
          setError('Could not fetch your location. Please enter your address manually.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser. Please enter your address manually.');
    }
  }, [fetchAddressFromCoords]);

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchRepresentatives(address);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = representatives.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(representatives.length / itemsPerPage); i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? 'active-page' : ''}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="representatives-container">
      <h2>Find Your Representatives</h2>
      <button onClick={handleGeolocation}>Use My Location</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={handleChange}
          required
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div className="representatives-list">
        {currentItems.map((rep, index) => (
          <div key={index} className="representative-card">
            <h3>{rep.name}</h3>
            <p>{rep.office}</p>
            <p>{rep.party}</p>
            <p>{rep.phones && rep.phones.join(', ')}</p>
            <p>{rep.emails && rep.emails.join(', ')}</p>
            <p>{rep.urls && rep.urls.join(', ')}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {renderPageNumbers()}
      </div>
    </div>
  );
};

export default Representatives;

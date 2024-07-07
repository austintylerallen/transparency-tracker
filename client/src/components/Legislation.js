import React, { useEffect, useState } from 'react';
import { getRecentBills } from '../services/api';
import './Legislation.css';

const Legislation = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of bills per page

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const data = await getRecentBills();
        console.log('Fetched bills data:', data);
        setBills(data);
      } catch (err) {
        setError('Failed to fetch recent bills. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastBill = currentPage * itemsPerPage;
  const indexOfFirstBill = indexOfLastBill - itemsPerPage;
  const currentBills = bills.slice(indexOfFirstBill, indexOfLastBill);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(bills.length / itemsPerPage); i++) {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="legislation-container">
      <h2>Recent Bills</h2>
      <ul>
        {currentBills.map((bill, index) => (
          <li key={index} className="bill-card">
            <h3>{bill.title}</h3>
            <p><strong>Bill Number:</strong> {bill.billNumber}</p>
            <p><strong>Sponsor:</strong> {bill.sponsorName} ({bill.sponsorParty})</p>
            <p><strong>Summary:</strong> {bill.summary}</p>
            <p><strong>Status:</strong> {bill.status}</p>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {renderPageNumbers()}
      </div>
    </div>
  );
};

export default Legislation;

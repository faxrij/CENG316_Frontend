import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import '../ElectionResultPage.css';

const ElectionResultPage = () => {
  const [resultData, setResultData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: electionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`http://164.90.217.39:5000/api/election/${electionId}/result`);
        const data = await response.json();
        setResultData(data.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [electionId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!resultData || !resultData.candidateElectionResultList || !resultData.message) {
    const handleNavigateBack = () => {
      navigate('/elections');
    };

    return (
      <div>
        <h1>Election Result</h1>
        <p>An error occurred while loading.</p>
        <Button onClick={handleNavigateBack}>Go Back</Button>
      </div>
    );
  }

  const { candidateElectionResultList, message } = resultData;

  return (
    <div className='result-container'>
      <h1>Election Result</h1>
      <p className='result-message'>{message}</p>
      <table className='result-table'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Vote Number</th>
          </tr>
        </thead>
        <tbody>
          {candidateElectionResultList.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.firstName}</td>
              <td>{candidate.lastName}</td>
              <td>{candidate.voteNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ElectionResultPage;

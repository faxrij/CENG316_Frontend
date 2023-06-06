import React, { useState, useEffect } from 'react';
import { Button } from "../Button";
import '../VotingPage.css';

const VotingPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch("http://164.90.217.39:5000/api/candidate");
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        if (data && data.data && Array.isArray(data.data)) {
          setCandidates(data.data);
        } else {
          setCandidates([]);
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
        setCandidates([]);
      }
    };
    
    fetchCandidates();
  }, []);

  const handleCandidateSelection = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleSubmitVote = () => {
    if (selectedCandidate !== '') {
      // Perform the necessary actions to submit the vote
      console.log(`Vote submitted for candidate: ${selectedCandidate}`);
    } else {
      alert('You cannot submit your vote without choosing a candidate.');
    }
  };

  return (
    <div className='vote-container'>
      <h1>Department Elections</h1>
  
      <div className='vote-candidate'>
        {candidates.length > 0 ? (
          candidates.map((candidate, index) => (
            <div className='vote-item' key={index}>
              {/* <img src={candidate.image} alt={`Candidate ${index + 1}`} /> */}
              <img src='student4.png' /> 
              <label htmlFor={`candidate${index + 1}`}>{candidate.description}</label>
              <input
                type="radio"
                id={`candidate${index + 1}`}
                name="candidate"
                value={candidate.description}
                checked={selectedCandidate === candidate.description}
                onChange={() => handleCandidateSelection(candidate.description)}
              />
            </div>
          ))
        ) : (
          <div>No candidates available</div>
        )}
      </div>
      
      <Button 
        buttonStyle='btn--red'
        onClick={handleSubmitVote}
      >
        Submit Vote
      </Button>
    </div>
  );
  
};

export default VotingPage;

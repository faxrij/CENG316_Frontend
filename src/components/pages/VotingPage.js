import React, { useState } from 'react';
import { Button } from "../Button";
import '../VotingPage.css';

const VotingPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState('');

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
        <div className='vote-item'>
          <img src='student4.png'></img>
          <label htmlFor="candidate1">Candidate 1</label>
          <input
            type="radio"
            id="candidate1"
            name="candidate"
            value="Candidate 1"
            checked={selectedCandidate === 'Candidate 1'}
            onChange={() => handleCandidateSelection('Candidate 1')}
          />
        </div>

        <div className='vote-item'>
          <img src='student2.png'></img>
          <label htmlFor="candidate2">Candidate 2</label>
          <input
            type="radio"
            id="candidate2"
            name="candidate"
            value="Candidate 2"
            checked={selectedCandidate === 'Candidate 2'}
            onChange={() => handleCandidateSelection('Candidate 2')}
          />
        </div>

        <div className='vote-item'>
          <img src='student3.png'></img>
          <label htmlFor="candidate3">Candidate 3</label>
          <input
            type="radio"
            id="candidate3"
            name="candidate"
            value="Candidate 3"
            checked={selectedCandidate === 'Candidate 3'}
            onChange={() => handleCandidateSelection('Candidate 3')}
          />
        </div>
      </div>
      
      <Button 
      buttonStyle='btn--red'
      onClick={handleSubmitVote}>Submit Vote</Button>
    </div>
  );
};

export default VotingPage;

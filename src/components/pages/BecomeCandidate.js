import React, { useState } from 'react';
import '../BecomeCandidate.css';

function BecomeCandidate() {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCheckCandidacy = () => {
    console.log('Checking for candidacy...');
    console.log('Description:', description);
  };

  return (
    <div>
      <h2>Do you want to become a candidate in the upcoming elections?</h2>
      <p>Enter a description explaining your qualifications and reasons for candidacy:</p>
      <textarea
        rows={4}
        cols={50}
        value={description}
        onChange={handleDescriptionChange}
      ></textarea>
      <br />
      <button onClick={handleCheckCandidacy}>Check for Candidacy</button>
    </div>
  );
}

export default BecomeCandidate;

import React, { useState, useEffect } from "react";
import { Button } from "../Button";
import { useParams, useNavigate } from "react-router-dom";
import "../VotingPage.css";

const VotingPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const { id: electionId } = useParams();
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const url = `http://164.90.217.39:5000/api/election/${electionId}/candidate`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        if (data && data.data && Array.isArray(data.data)) {
          setCandidates(data.data);
          console.log(data.data)
        } else {
          setCandidates([]);
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
        setCandidates([]);
      }
    };

    fetchCandidates();
  }, [electionId]);

  const handleCandidateSelection = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleSubmitVote = () => {
    if (selectedCandidate !== "") {
      const voteData = {
        voterUserName: userName,
        candidateUserName: selectedCandidate,
        electionId: electionId,
      };
      console.log(voteData.voterUserName);
      console.log(voteData.candidateUserName);
      console.log(voteData.electionId);


      fetch("http://164.90.217.39:5000/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(voteData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
          }
          setSuccessModalOpen(true); // Open success modal
          navigate("/home");
        })
        .catch((error) => {
          console.error("Error submitting vote:", error);
          setErrorModalOpen(true); // Open error modal
        });
    } else {
      alert("You cannot submit your vote without choosing a candidate.");
    }
  };

  const closeModal = () => {
    setSuccessModalOpen(false);
    setErrorModalOpen(false);
  };

  return (
    <div className="vote-container">
      <h1>Department Elections</h1>

      <div className="vote-candidate">
        {candidates.length > 0 ? (
          candidates.map((candidate, index) => (
            <div className="vote-item" key={index}>
              <img src="/student4.png" alt={`Candidate ${index + 1}`} />
              <label htmlFor={`candidate${index + 1}`}>
                {candidate.firstName}
              </label>
              <input
                type="radio"
                id={`candidate${index + 1}`}
                name="candidate"
                value={candidate.description}
                checked={selectedCandidate === candidate.firstName}
                onChange={() => handleCandidateSelection(candidate.firstName)}
              />
            </div>
          ))
        ) : (
          <div>No candidates available</div>
        )}
      </div>

      <Button buttonStyle="btn--red" onClick={handleSubmitVote}>
        Submit Vote
      </Button>

      {/* Success Modal */}
      {successModalOpen && (
        <div className="modal">
          <div className="modal-content success">
            <h3>Success!</h3>
            <p>Your vote has been submitted successfully.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {errorModalOpen && (
        <div className="modal">
          <div className="modal-content error">
            <h3>Error!</h3>
            <p>There was an error submitting your vote. Please try again later.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingPage;

import React, { useState, useEffect } from "react";
import { Button } from "../Button";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../VotingPage.css";

const VotingPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [candidates, setCandidates] = useState([]);
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
          console.log(data.data);
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
        candidateUserName: selectedCandidate.userName,
        electionId: electionId,
      };

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
          toast.success("Your vote has been submitted successfully.", {
            onClose: () => {
              navigate("/home");
            },
          });
        })
        .catch((error) => {
          console.error("Error submitting vote:", error);
          toast.error("There was an error submitting your vote.", error.error);
        });
    } else {
      alert("You cannot submit your vote without choosing a candidate.");
    }
  };

  return (
    <div className="vote-container">
      <h1>Department Elections</h1>

      <div className="vote-candidate">
        {candidates.length > 0 ? (
          candidates.map((candidate, index) => (
            <div className="vote-item" key={index}>
              <img src="/student4.png" alt={`Candidate ${index + 1}`} />
              <div>
                <label htmlFor={`candidate${index + 1}`}>
                  {candidate.firstName + " " + candidate.lastName}
                </label>
                <p className="description">{candidate.description}</p>
              </div>
              <input
                type="radio"
                id={`candidate${index + 1}`}
                name="candidate"
                value={candidate.description}
                checked={selectedCandidate === candidate}
                onChange={() => handleCandidateSelection(candidate)}
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

      {/* ToastContainer */}
      <ToastContainer />

    </div>
  );
};

export default VotingPage;

import React, { useEffect, useState } from 'react';
import "../Elections.css";
import ConfirmationModal from "../ConfirmationModal";
import { Link, Route, Routes, useNavigate } from "react-router-dom"; // Import useNavigate
import { Button } from "../Button";

import ElectionService from '../ElectionService';

import {
	handleCreateElection,
	handleEditElection,
	handleDeleteElection,
} from "../ElectionActions";

import CreateElectionPage from "./CreateElectionPage";

const Elections = () => {
  const [electionsData, setElectionsData] = useState([]);
  const electionService = new ElectionService();

  const [showModal, setShowModal] = useState(false);
  const [selectedElection, setSelectedElection] = useState(null);
  const [showCreateElection, setShowCreateElection] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Add useNavigate hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await electionService.getElections();
        setElectionsData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="loading-message">Loading...</div>;
  }
  
  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }
  
  const userRole = localStorage.getItem('userRole');
  const today = new Date();

  const handleVote = (electionId) => {
    console.log(`Vote button clicked for election with id: ${electionId}`);
    navigate(`/vote/${electionId}`);
  };  

  const handleConfirmDelete = () => {
    console.log(`Deleting election: ${selectedElection}`);
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleDeleteElection = (electionName) => {
    setShowModal(true);
    setSelectedElection(electionName);
  };

  const handleCreateElection = () => {
    setShowCreateElection(true);
  };

  const handleResult = (electionId) => {
    navigate(`/election/${electionId}/result`);
  };

  return (
    <div className="elections-container">
      <h1 className="elections-heading">Elections</h1>
      {userRole === "Admin" && (
        <div className="elections-actions">
          <Link to="/create-election" className="create-election-button">
            Create Election
          </Link>
        </div>
      )}
      <div className="elections-list">
        {electionsData.map((election, index) => (
          <div key={index} className="election-card">
            <h2 className="election-title">{election.name}</h2>
            <div className="election-details">
              <p className="election-date">Start Date: {election.startDate}</p>
              <p className="election-date">End Date: {election.endDate}</p>
              <p className="election-location">
                Department: {election.departmentName}
              </p>
            </div>
            {userRole !== "Admin" && today >= new Date(election.startDate) && today <= new Date(election.endDate) && (
              <Button 
                buttonStyle='btn--red'
                onClick={() => handleVote(election.id)}
              >
                Vote
              </Button>
            )}
            {today > new Date(election.endDate) && (
              <Button 
                onClick={() => handleResult(election.id)}
              >
                Results
              </Button>
            )}
            {userRole === "Admin" && (
              <>
                <Button
                  onClick={() => handleEditElection(election.name)}
                >
                  Edit
                </Button>
                <Button 
                  buttonStyle='btn--red'
                  onClick={() => handleDeleteElection(election.name)}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        ))}
      </div>
      {showModal && (
        <ConfirmationModal
          message={`Are you sure you want to delete the election: ${selectedElection}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <Routes>
        <Route path="/create-election" component={CreateElectionPage} />
      </Routes>
    </div>
  );
};

export default Elections;

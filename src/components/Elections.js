import React, { useState } from 'react';
import './Elections.css';
import { getElectionsData } from '../mocks/mockElections'; //
import ConfirmationModal from './ConfirmationModal';
import {
    handleVote,
    handleCreateElection,
    handleEditElection,
    handleDeleteElection,
  } from './ElectionActions';
  

  const Elections = () => {
    const electionsData = getElectionsData();
    const [showModal, setShowModal] = useState(false);
    const [selectedElection, setSelectedElection] = useState(null);
  
    const handleConfirmDelete = () => {
      // Perform the delete action for the selected election
      console.log(`Deleting election: ${selectedElection}`);
  
      // Close the modal after the delete action is completed
      setShowModal(false);
    };
  
    const handleCancelDelete = () => {
      // Cancel the delete action and close the modal
      setShowModal(false);
    };

    const handleDeleteElection = (electionName) => {
        setShowModal(true);
        setSelectedElection(electionName);
      };
      
  
    return (
      <div className="elections-container">
        <h1 className="elections-heading">Elections</h1>
        <div className="elections-actions">
          <button className="create-election-button" onClick={handleCreateElection}>
            Create Election
          </button>
        </div>
        <div className="elections-list">
          {electionsData.map((election, index) => (
            <div key={index} className="election-card">
              <h2 className="election-title">{election.name}</h2>
              <p className="election-description">{election.description}</p>
              <div className="election-details">
                <p className="election-date">Start Date: {election.startDate}</p>
                <p className="election-date">End Date: {election.endDate}</p>
                <p className="election-location">Departments: {election.departments}</p>
              </div>
              <button className="vote-button" onClick={() => handleVote(election.name)}>
                Vote
              </button>
              <button className="edit-button" onClick={() => handleEditElection(election.name)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDeleteElection(election.name)}>
                Delete
              </button>
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
      </div>
    );
  };
  
  export default Elections;
  
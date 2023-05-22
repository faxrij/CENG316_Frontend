import React, { useEffect, useState } from 'react';
import "../Elections.css";
import { getElectionsData } from "../../mocks/mockElections"; //
import ConfirmationModal from "../ConfirmationModal";
import { Link, Switch, Route, Routes } from "react-router-dom";

import ElectionService from '../ElectionService';

import {
	handleVote,
	handleCreateElection,
	handleEditElection,
	handleDeleteElection,
} from "../ElectionActions";

import CreateElectionPage from "./CreateElectionPage"; // Import the CreateElectionPage component

const Elections = () => {
  const [electionsData, setElectionsData] = useState([]);
  const electionService = new ElectionService();

	const [showModal, setShowModal] = useState(false);
	const [selectedElection, setSelectedElection] = useState(null);
	const [showCreateElection, setShowCreateElection] = useState(false); // State for showing CreateElectionPage

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getElectionsData();
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

	return (
		<div className="elections-container">
			<h1 className="elections-heading">Elections</h1>
			<div className="elections-actions">
				<Link to="/create-election" className="create-election-button">
					Create Election
				</Link>
			</div>
			<div className="elections-list">
				{electionsData.map((election, index) => (
					<div key={index} className="election-card">
						<h2 className="election-title">{election.name}</h2>
						{/* <p className="election-description">{election.description}</p> */}
						<div className="election-details">
							<p className="election-date">Start Date: {election.startDate}</p>
							<p className="election-date">End Date: {election.endDate}</p>
							<p className="election-location">
								Department: {election.department}
							</p>
						</div>
						<button
							className="vote-button"
							onClick={() => handleVote(election.name)}
						>
							Vote
						</button>
						<button
							className="edit-button"
							onClick={() => handleEditElection(election.name)}
						>
							Edit
						</button>
						<button
							className="delete-button"
							onClick={() => handleDeleteElection(election.name)}
						>
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
			<Routes>
				<Route path="/create-election" component={CreateElectionPage} />
			</Routes>
		</div>
	);
};

export default Elections;
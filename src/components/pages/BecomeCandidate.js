import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../BecomeCandidate.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BecomeCandidate() {
	const [description, setDescription] = useState("");
	const [errorModalOpen, setErrorModalOpen] = useState(false);
	const [successModalOpen, setSuccessModalOpen] = useState(false);
	const navigate = useNavigate();

	const handleDescriptionChange = (event) => {
		setDescription(event.target.value);
	};

	const handleCheckCandidacy = () => {
		console.log("Checking for candidacy...");
		console.log("Description:", description);

		const requestData = {
			userName: localStorage.getItem("userName"), // Update with the appropriate value
			description: description,
		};

		fetch("http://164.90.217.39:5000/api/candidate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify(requestData),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Request failed with status ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
        console.log('Response:', data);
        if (data.data === true) {
          // Candidate created successfully
          toast.success('You will be checked for candidacy.'); // Display success toast
          setTimeout(() => {
            localStorage.setItem('userRole', 'Candidate'); // Set userRole to "Candidate" in localStorage
            navigate('/home'); // Navigate to the "/home" page after 1000ms (1 second)
          }, 1000);
        }
      })
      
			.catch((error) => {
				console.error("Error:", error);
				setErrorModalOpen(true); // Open error modal
			});
	};

	const closeSuccessModal = () => {
		setSuccessModalOpen(false);
	};

	const closeErrorModal = () => {
		setErrorModalOpen(false);
	};

	return (
		<div>
			<h2>Do you want to become a candidate in the upcoming elections?</h2>
			<p>
				Enter a description explaining your qualifications and reasons for
				candidacy:
			</p>
			<textarea
				rows={4}
				cols={50}
				value={description}
				onChange={handleDescriptionChange}
			></textarea>
			<br />
			<button onClick={handleCheckCandidacy}>Check for Candidacy</button>
			{/* Success Modal */}
			{successModalOpen && (
				<div className="modal">
					<div className="modal-content success">
						<h3>Success!</h3>
						<p>You will be checked for candidacy.</p>
						<button onClick={closeSuccessModal}>Close</button>
					</div>
				</div>
			)}
			{/* Error Modal */}
			{errorModalOpen && (
				<div className="modal">
					<div className="modal-content error">
						<h3>Something went wrong!</h3>
						<p>
							An error occurred while checking candidacy. Please try again
							later.
						</p>
						<button onClick={closeErrorModal}>Close</button>
					</div>
				</div>
			)}
			<ToastContainer /> {/* Add this line to display toast notifications */}
		</div>
	);
}

export default BecomeCandidate;

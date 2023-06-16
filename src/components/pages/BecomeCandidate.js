import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../BecomeCandidate.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../Button";

function BecomeCandidate() {
  const [description, setDescription] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCheckCandidacy = async () => {

    const requestData = {
      userName: localStorage.getItem("userName"), // Update with the appropriate value
      description: description,
    };

    await fetch("http://164.90.217.39:5000/api/candidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
			setResponseMessage(response.error);
			console.log(response);
        }
        return response.json();
      })
      .then((data) => {
        if (!data.hasError) {
          // Candidate created successfully
          toast.success("You will be checked for candidacy."); // Display success toast
          setTimeout(() => {
			console.log(data);
            localStorage.setItem("userRole", "Candidate"); // Set userRole to "Candidate" in localStorage
			localStorage.setItem("token", data.data.accessToken);
            navigate("/home"); // Navigate to the "/home" page after 1000ms (1 second)
          }, 1000);
        } else {
          // Candidate creation failed
          setResponseMessage(data.error); // Set response message
          toast.error(data.error); // Display error toast
        }
      })

      .catch((error) => {
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
    <div className="become-candidate-container">
      <div className="content">
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
        <Button buttonStyle="btn--red" onClick={handleCheckCandidacy}>
          Check for Candidacy
        </Button>
        {/* Success Modal */}
        {successModalOpen && (
          <div className="modal">
            <div className="modal-content success">
              <h3>Success!</h3>
              <p>You will be checked for candidacy.</p>
              <Button buttonStyle="btn--red" onClick={closeSuccessModal}>
                Close
              </Button>
            </div>
          </div>
        )}
        {/* Error Modal */}
        {errorModalOpen && (
          <div className="modal">
            <div className="modal-content error">
              <h3>Something went wrong!</h3>
              <p>
                {responseMessage}
              </p>
              <Button buttonStyle="btn--red" onClick={closeErrorModal}>
                Close
              </Button>
            </div>
          </div>
        )}
        <ToastContainer /> {/* Add this line to display toast notifications */}
      </div>
    </div>
  );
}

export default BecomeCandidate;

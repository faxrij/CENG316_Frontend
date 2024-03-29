import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../App.css";
import "./HeroSection.css";
import { Button } from "./Button.js";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import decodeJWT from "../jwtDecoder";
import { withdrawCandidate } from "./../services/CandidateService";

function HeroSection() {
  const name = localStorage.getItem("name");
  const lastName = localStorage.getItem("lastName");
  const userRole = localStorage.getItem("userRole");
  const departmentName = localStorage.getItem("departmentName");
  const year = localStorage.getItem("year");
  console.log(year);
  const navigate = useNavigate();
  const isStudent = userRole === "Student";
  const [responseMessage, setResponseMessage] = useState("");
  const token = localStorage.getItem("token");
  const decodedToken = decodeJWT(token);
  console.log(decodedToken);

  const [showWithdrawConfirmation, setShowWithdrawConfirmation] =
    useState(false);

  const handleWithdraw = async () => {
    const userName = localStorage.getItem("userName");
    const data = await withdrawCandidate(userName, token);

    console.log(data);
    if (!data.hasError) {
      // Candidate created successfully
      console.log(data);
      toast.success("You withdrawed successfully from the election."); // Display success toast
      localStorage.setItem("token", data.data.accessToken);
    } else {
      // Candidate creation failed
      setResponseMessage(data.error); // Set response message
      toast.error(data.error); // Display error toast
    }
    setShowWithdrawConfirmation(false);
  };

  return (
    <div className="hero-container">
      <div className="hero-profile">
        <img src="/student-avatar.png" alt="student image" />
        <div className="hero-info">
          <div className="hero-role">{`${userRole}`}</div>
          {departmentName !== "null" && (
            <div className="hero-major">Department: {departmentName}</div>
          )}
          {year !== "null" && <div className="hero-grade">Year: {year}</div>}
          <div className="apply-withdraw-container">
            {userRole === "Candidate" &&
            decodedToken.isApproved === "Approved" ? (
              <div className="withdraw-container">
                <Button
                  buttonSize="btn--large"
                  buttonStyle="btn--red"
                  className="withdraw-button"
                  onClick={() => setShowWithdrawConfirmation(true)}
                >
                  Withdraw from Election
                </Button>
                <Modal
                  isOpen={showWithdrawConfirmation}
                  onRequestClose={() => setShowWithdrawConfirmation(false)}
                  className="modal"
                  overlayClassName="overlay"
                >
                  <div className="modal-heading">Withdraw Confirmation</div>
                  <div className="modal-text">
                    Are you sure you want to withdraw from the election?
                  </div>
                  <div className="modal-actions">
                    <Button
                      buttonSize="btn--medium"
                      buttonStyle="btn--green"
                      onClick={handleWithdraw}
                    >
                      Yes
                    </Button>
                    <Button
                      buttonSize="btn--medium"
                      buttonStyle="btn--red"
                      onClick={() => setShowWithdrawConfirmation(false)}
                    >
                      No
                    </Button>
                  </div>
                </Modal>
              </div>
            ) : (
              isStudent && (
                <Link to="/become-candidate" className="apply-link">
                  <Button
                    buttonSize="btn--large"
                    buttonStyle="btn--red"
                    className="apply-button"
                  >
                    Apply For Candidacy
                  </Button>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
      <div className="hero-main">
        <h1>{`${name} ${lastName}`}</h1>
      </div>
    </div>
  );
}

export default HeroSection;

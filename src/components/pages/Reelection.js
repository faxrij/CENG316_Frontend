import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../Reelection.css";
import { Button } from "../Button";
import { toast } from "react-toastify";

const ReElection = () => {
    const location = useLocation();
    const { electionName } = location.state || {};
    
	const { id } = useParams();
	const navigate = useNavigate();
	const [endDate, setEndDate] = useState(null);

	const handleDateChange = (date) => {
		setEndDate(date);
	};

	const handleReelection = async () => {
        try {
            const response = await fetch(
                `http://164.90.217.39:5000/api/election/${id}/re-election`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ endDate }), // Include endDate in the request body
                }
            );

            if (response.ok) {
                toast.success("Election re-election requested successfully");
                setEndDate(null); // Clear the selected endDate
                navigate("/elections"); 
            } else {
                toast.error("Failed to request election re-election");
            }
        } catch (error) {
            console.error("An error occurred while requesting the election re-election:", error);
            toast.error("An error occurred while requesting the election re-election");
        }
    };

	return (
		<div className="reelection-container">
			<h1>Re-election</h1>
			<div className="reelection-date">
				<label htmlFor="end-date-picker">Select End Date:</label>
				<DatePicker
					id="end-date-picker"
					selected={endDate}
					onChange={handleDateChange}
					minDate={new Date(Date.now() + 86400000)} // Tomorrow's date
					dateFormat="yyyy-MM-dd"
				/>
			</div>
			<Button buttonStyle="btn--red" onClick={handleReelection}>Start Re-election</Button>
		</div>
	);
};

export default ReElection;

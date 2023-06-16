import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ReElection = () => {
    const location = useLocation();
    const { electionName } = location.state || {};
    
	const { id } = useParams();
	const navigate = useNavigate();
	const [endDate, setEndDate] = useState(null);

	const handleDateChange = (date) => {
		setEndDate(date);
	};

	const handleReelection = () => {
		// Perform the necessary logic for re-election using the endDate value
		console.log(`Re-election requested for election ID: ${id}`);
		console.log("Selected end date:", endDate);
		// Redirect to another page or perform additional actions
		navigate("/elections"); // Replace with the desired destination
	};

	return (
		<div>
			<h1>Re-election</h1>
			<div>
				<label htmlFor="end-date-picker">Select End Date:</label>
				<DatePicker
					id="end-date-picker"
					selected={endDate}
					onChange={handleDateChange}
					minDate={new Date(Date.now() + 86400000)} // Tomorrow's date
					dateFormat="yyyy-MM-dd"
				/>
			</div>
			<button onClick={handleReelection}>Start Re-election</button>
		</div>
	);
};

export default ReElection;

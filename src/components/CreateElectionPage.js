import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateElectionPage.css";
import ElectionService from "./ElectionService";

const CreateElectionPage = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [department, setDepartment] = useState("");
	const [departmentsData, setDepartmentsData] = useState([]);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	useEffect(() => {
		// Fetch departments data from the API
		fetchDepartments();
	}, []);

	const fetchDepartments = async () => {
		try {
			const response = await fetch("YOUR_API_ENDPOINT"); // Replace with your API endpoint
			const data = await response.json();
			setDepartmentsData(data);
		} catch (error) {
			console.error("Error fetching departments:", error);
		}
	};

	const handleStartDateChange = (date) => {
		setStartDate(date);
		if (endDate && date > endDate) {
			setEndDate(null);
		}
	};

	const handleEndDateChange = (date) => {
		setEndDate(date);
		if (startDate && date < startDate) {
			setStartDate(null);
		}
	};

	const today = new Date();
	const electionService = new ElectionService();

	const handleCreateElection = (e) => {
		e.preventDefault();
		// Handle creating the election with the form data
		console.log("Creating election...");
		console.log("Name:", name);
		console.log("Department:", department);
		console.log("Start Date:", startDate);
		console.log("End Date:", endDate);

		try {
			const newElection = electionService.createElection({
				name,
				description,
				department,
				startDate,
				endDate,
			});
			console.log("New Election:", newElection);
			// Reset the form inputs
			setName("");
			setDescription("");
			setDepartment("");
			setStartDate(null);
			setEndDate(null);
		} catch (error) {
			console.error("Error creating election:", error);
		}

		// Reset the form inputs
		setName("");
		setDescription("");
		setDepartment("");
		setStartDate(null);
		setEndDate(null);
	};

	return (
		<div className="create-election-page">
			<h1>Create Election</h1>
			<div className="form-wrapper">
				<form onSubmit={handleCreateElection}>
					<div className="form-group">
						<label htmlFor="name">Name:</label>
						<input
							type="text"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<div className="label-group">
							<label htmlFor="department">Department:</label>
							<select
								id="department"
								value={department}
								onChange={(e) => setDepartment(e.target.value)}
								required
							>
								<option value="">Select department</option>
								{departmentsData.map((department) => (
									<option key={department.id} value={department.id}>
										{department.name}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="startDate">Start Date:</label>
						<DatePicker
							id="startDate"
							selected={startDate}
							onChange={handleStartDateChange}
							dateFormat="yyyy-MM-dd"
							placeholderText="Select start date"
							minDate={today}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="endDate">End Date:</label>
						<DatePicker
							id="endDate"
							selected={endDate}
							onChange={handleEndDateChange}
							dateFormat="yyyy-MM-dd"
							placeholderText="Select end date"
							minDate={startDate || today}
							required
						/>
					</div>
					<button type="submit">Create</button>
				</form>
			</div>
		</div>
	);
};

export default CreateElectionPage;

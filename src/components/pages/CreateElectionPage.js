import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../CreateElectionPage.css";
import ElectionService from "../ElectionService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../Button";
import { addDays } from "date-fns";


const CreateElectionPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departmentsData, setDepartmentsData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    // Fetch departments data from the API
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch("http://164.90.217.39:5000/api/department"); // Replace with your API endpoint
      const data = await response.json();
      setDepartmentsData(data.data);
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

  const today = addDays(new Date(), 1);
  const electionService = new ElectionService();
  const navigate = useNavigate();

  const handleCreateElection = (e) => {
    e.preventDefault();
    console.log("Creating election...");
    console.log("Name:", name);
    console.log("Department:", departmentId);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    try {
      // Assuming `electionService.createElection` returns the newly created election
      const newElection = electionService.createElection({
        name,
        startDate,
        endDate,
        departmentId,
      });
      console.log("New Election:", newElection);

      // Display success message
      toast.success("Election created successfully!");

      setTimeout(() => {
        navigate("/elections");
      }, 2000);

      // Reset the form inputs
      setName("");
      setDescription("");
      setDepartmentId("");
      setStartDate(null);
      setEndDate(null);
    } catch (error) {
      console.error("Error creating election:", error);
      // Display error message
      toast.error("Failed to create election. Please try again.");
    }
  };

  const endDateMinDate = startDate ? addDays(startDate, 1) : today;

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
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
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
              minDate={endDateMinDate}
              required
            />
          </div>
          <Button buttonStyle='btn--red' type="submit">Create</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateElectionPage;

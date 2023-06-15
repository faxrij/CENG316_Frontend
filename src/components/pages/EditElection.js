import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../EditElectionPage.css";
import ElectionService from "../ElectionService";

const EditElectionPage = () => {
  const location = useLocation();
  const { election } = location.state;

  const [name, setName] = useState(election.name);
  const [departmentName, setDepartmentName] = useState(election.departmentName);
  const [departmentsData, setDepartmentsData] = useState([]);
  const [startDate, setStartDate] = useState(new Date(election.startDate));
  const [endDate, setEndDate] = useState(new Date(election.endDate));

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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Find the selected departmentId based on the departmentName
    const selectedDepartment = departmentsData.find(
      (department) => department.name === departmentName
    );
    const departmentId = selectedDepartment ? selectedDepartment.id : "";

    // Update the election with the new values
    const updatedElection = {
      ...election,
      name: name,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      departmentId: departmentId,
    };

    // Perform the update operation
    // ...

    // Reset form fields
    setName("");
    setDepartmentName("");
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="edit-election-page">
      <h2>Edit Election</h2>
      <form onSubmit={handleFormSubmit}>
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
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
          >
            <option value="">Select department</option>
            {departmentsData.map((department) => (
              <option
                key={department.id}
                value={department.name}
              >
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <DatePicker
            id="startDate"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <DatePicker
            id="endDate"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            minDate={startDate || new Date()}
            required
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditElectionPage;

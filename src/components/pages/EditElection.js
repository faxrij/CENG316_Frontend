import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ElectionService from "../ElectionService";
import "../EditElectionPage.css";

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
      const response = await fetch("http://164.90.217.39:5000/api/department");
      const data = await response.json();
      setDepartmentsData(data.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Find the selected departmentId based on the departmentName
    const selectedDepartment = departmentsData.find(
      (department) => department.name === departmentName
    );
    const departmentId = selectedDepartment ? selectedDepartment.id : "";

    // Update the election with the new values
    const updatedElection = {
      name: name,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      departmentId: departmentId,
    };

    try {
      // Perform the update operation by sending a PUT request to the API
      const response = await fetch(
        `http://164.90.217.39:5000/api/election/${election.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedElection),
        }
      );

      if (response.ok) {
        // Update was successful
        toast.success("Election updated successfully");
        navigate("/elections"); // Navigate back to the elections page
      } else {
        // Update failed
        const errorData = await response.json();
        const errorMessage = errorData.message || "Failed to update election";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Failed to update election:", error);
      toast.error("An error occurred while updating the election");
    }

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

      <ToastContainer />
    </div>
  );
};

export default EditElectionPage;

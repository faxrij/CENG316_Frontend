import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../CreateAnnouncement.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateAnnouncement = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const announcementData = {
      name,
      description,
      createdBy
    };
  
    try {
      const response = await fetch('http://164.90.217.39:5000/api/announcement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(announcementData)
      });
  
      if (response.ok) {
        // Handle success logic here, such as displaying a success message or redirecting to the announcements page
        toast.success('Announcement created successfully');
        navigate('/announcements'); // Navigate to "/announcements" page
      } else {
        // Handle error logic here, such as displaying an error message
        console.error('Failed to create announcement');
        toast.error('Failed to create announcement');
      }
    } catch (error) {
      // Handle error logic here, such as displaying an error message
      console.error('Failed to create announcement:', error);
      toast.error('Failed to create announcement');
    }
  };
  

  return (
    <div className="create-announcement-page">
      <h1 className="create-announcement-heading">Create Announcement</h1>
      <form className="create-announcement-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-textarea"
          ></textarea>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="createdBy">
            Created By:
          </label>
          <input
            type="text"
            id="createdBy"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="form-button">
            Create Announcement
          </button>
          <Link to="/announcements" className="form-cancel-button">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateAnnouncement;

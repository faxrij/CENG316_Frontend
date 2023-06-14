import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CreateAnnouncement.css';

const CreateAnnouncement = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic here
    const today = new Date().toISOString().slice(0, 10);
    console.log("TODAY", today);
    console.log('Name:', name);
    console.log('Description:', description);
    console.log('Created By:', createdBy);
  };

  return (
    <div className="create-announcement-page">
      <h1 className="create-announcement-heading">Create Announcement</h1>
      <form className="create-announcement-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Name:</label>
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
          <label className="form-label" htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-textarea"
          ></textarea>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="createdBy">Created By:</label>
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
          <button type="submit" className="form-button">Create Announcement</button>
          <Link to="/announcements" className="form-cancel-button">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default CreateAnnouncement;

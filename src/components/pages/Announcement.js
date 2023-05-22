import React, { useState } from 'react';
import '../Announcement.css';
import mockAnnouncements from '../../mocks/mockAnnouncements';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import '../Button.css';

const Announcement = () => {
  const announcements = mockAnnouncements();
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementDescription, setAnnouncementDescription] = useState('');

  const handleCreateAnnouncement = () => {
    // Perform the necessary actions for creating the announcement
    // You can access the selectedDepartment, startDate, and endDate values here
    // For simplicity, this example only logs the values to the console
    console.log('Title:', announcementTitle);
    console.log('Description:', announcementDescription);
    console.log('Selected Department:', selectedDepartment);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);

    // Close the create popup
    setShowCreatePopup(false);
  };

  return (
    <div className="announcement-container">
      <h1 className="announcement-heading">
        Announcements
        <span className="create-announcement-button-wrapper">
          <Button
            className="create-announcement-button"
            onClick={() => setShowCreatePopup(true)}
          >
            Create Announcement
          </Button>
        </span>
      </h1>
      {announcements.map((announcement, index) => (
        <div key={index} className="announcement-card">
          <h2 className="announcement-title">{announcement.title}</h2>
          <p className="announcement-description">{announcement.description}</p>
          <div className="announcement-details">
            <p className="announcement-date">Date: {announcement.date}</p>
            <p className="announcement-creator">Created by: {announcement.creator}</p>
          </div>
        </div>
      ))}
      {showCreatePopup && (
        <div className="create-announcement-popup-overlay show">
          <div className="create-announcement-popup-content">
            <div className="create-announcement-section">
              <label htmlFor="announcement-title">Title:</label>
              <input
                type="text"
                id="announcement-title"
                value={announcementTitle}
                onChange={(e) => setAnnouncementTitle(e.target.value)}
              />
            </div>
            <div className="create-announcement-section">
              <label htmlFor="announcement-description">Description:</label>
              <textarea
                id="announcement-description"
                value={announcementDescription}
                onChange={(e) => setAnnouncementDescription(e.target.value)}
              />
            </div>
            <div className="create-announcement-section">
              <label htmlFor="department-select">Select Department:</label>
              <select
                id="department-select"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Chemical Engineering">Chemical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Industrial Engineering">Industrial Engineering</option>
                <option value="Material Science and Engineering">Material Science and Engineering</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Architecture">Architecture</option>
                <option value="City and Regional Planning">City and Regional Planning</option>
                <option value="Molecular Biology and Genetics">Molecular Biology and Genetics</option>
                <option value="Bioengineering">Bioengineering</option>
                <option value="Environmental Engineering">Environmental Engineering</option>
                <option value="Energy Systems Engineering">Energy Systems Engineering</option>
                <option value="Food Engineering">Food Engineering</option>
                <option value="Mechanical Engineering (Automotive)">Mechanical Engineering (Automotive)</option>
                <option value="Mechanical Engineering (Aerospace)">Mechanical Engineering (Aerospace)</option>
                <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</option>
                {/* Add other department options */}
              </select>
            </div>
            <div className="create-announcement-section">
              <label htmlFor="start-date">Start Date:</label>
              <input
                type="date"
                id="start-date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="create-announcement-section">
              <label htmlFor="end-date">End Date:</label>
              <input
                type="date"
                id="end-date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="create-announcement-buttons">
              <Button className="cancel-button" onClick={() => setShowCreatePopup(false)}>
                Cancel
              </Button>
              <Button className="create-button" onClick={handleCreateAnnouncement}>
                Create
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcement;

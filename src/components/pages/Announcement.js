import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mockAnnouncements from '../../mocks/mockAnnouncements';
import '../Announcement.css';

const Announcement = () => {
  const announcements = mockAnnouncements();
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  const userRole = localStorage.getItem("userRole");

  const handleCreateAnnouncement = () => {
    setShowCreatePopup(false);
  };

  return (
    <div className="announcement-container">
      <h1 className="announcement-heading">
        Announcements
        {userRole !== 'Admin' && (
          <span className="create-announcement-button-wrapper">
            <Link to="/announcement" className="create-announcement-button">
              Create Announcement
            </Link>
          </span>
        )}
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
    </div>
  );
};

export default Announcement;

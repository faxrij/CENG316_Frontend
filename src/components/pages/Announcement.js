import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Announcement.css';

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("http://164.90.217.39:5000/api/announcement");
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data.data.announcementList);
        } else {
          throw new Error("Failed to fetch announcements");
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (isLoading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  const handleCreateAnnouncement = () => {
    setShowCreatePopup(false);
  };

  return (
    <div className="announcement-container">
      <h1 className="announcement-heading">
        Announcements
        {userRole === 'Admin' && (
          <span className="create-announcement-button-wrapper">
            <Link to="/announcement" className="create-announcement-button">
              Create Announcement
            </Link>
          </span>
        )}
      </h1>
      {announcements.map((announcement, index) => (
        <div key={index} className="announcement-card">
          <h2 className="announcement-title">{announcement.name}</h2>
          <p className="announcement-description">{announcement.description}</p>
          <div className="announcement-details">
            <p className="announcement-creator">Created by: {announcement.createdBy}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Announcement;

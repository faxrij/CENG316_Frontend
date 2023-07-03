import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Announcement.css';
import { Button } from '../Button';

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState(null);

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

  const handleDeleteAnnouncement = (announcementId) => {
    // Show the delete confirmation dialog
    setSelectedAnnouncementId(announcementId);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteAnnouncement = async () => {
    try {
      const response = await fetch(`http://164.90.217.39:5000/api/announcement/${selectedAnnouncementId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Perform any additional UI updates or actions after successful deletion
        const updatedAnnouncements = announcements.filter(
          (announcement) => announcement.id !== selectedAnnouncementId
        );
        setAnnouncements(updatedAnnouncements);
      } else {
        throw new Error('Failed to delete announcement');
      }
    } catch (error) {
      // Handle the error
      console.error(error);
    } finally {
      // Close the confirmation dialog
      setShowDeleteConfirmation(false);
    }
  };
  

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
              <Button buttonStyle="btn--red">Create Announcement</Button>
            </Link>
          </span>
        )}
      </h1>
      {announcements.map((announcement) => (
        <div key={announcement.id} className="announcement-card">
          <h2 className="announcement-title">{announcement.name}</h2>
          <p className="announcement-description">{announcement.description}</p>
          <div className="announcement-details">
            <p className="announcement-creator">Created by: {announcement.createdBy}</p>
            {userRole === 'Admin' && (
              <Button
                onClick={() => handleDeleteAnnouncement(announcement.id)}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      ))}

      {/* Modal Confirmation Dialog */}
      {showDeleteConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirmation</h3>
            <p>Are you sure you want to delete this announcement?</p>
            <div className="modal-actions">
              <Button onClick={confirmDeleteAnnouncement}>Yes</Button>
              <Button buttonStyle="btn--red" onClick={() => setShowDeleteConfirmation(false)}>No</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcement;

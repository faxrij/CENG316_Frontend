import React from 'react';
import '../Announcement.css';
import mockAnnouncements from '../../mocks/mockAnnouncements'; // Import the mockAnnouncements data

const Announcement = () => {
    const announcements = mockAnnouncements();
  
    return (
      <div className="announcement-container">
        <h1 className="announcement-heading">Announcements</h1>
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
  
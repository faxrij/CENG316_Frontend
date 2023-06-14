import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import Modal from './Modal';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const { logout } = useAuth(); // Get the logout function from AuthContext

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const handleLogout = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const navigate = useNavigate();

  const logoutHandler =() => {
    logout();
    navigate('/')
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/home" className="navbar-logo" onClick={closeMobileMenu}>
            <img
              src="https://ceng.iyte.edu.tr/wp-content/uploads/sites/124/2017/11/iztech-logo-1.png"
              alt="iyte logo"
            ></img>
            IZTECH ELECTION
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to="/home" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/announcements"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Announcements
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/elections"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Elections
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/"
                className="nav-links-mobile"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </li>
          </ul>
          {button && (
            <Button buttonStyle="btn--outline" onClick={handleLogout}>
              LOGOUT
            </Button>
          )}
        </div>
      </nav>
      <Modal show={showModal} onClose={closeModal}>
        <h2>Are you sure you want to exit?</h2>
        <Button buttonStyle="btn--primary" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          buttonStyle="btn--red"
          onClick={logoutHandler
            
            // Perform logout action
            // You can add your logic here to handle the logout
            // For example, clearing session, resetting state, etc.
          }
        >
          Logout
        </Button>
      </Modal>
    </div>
  );
};

export default Navbar;

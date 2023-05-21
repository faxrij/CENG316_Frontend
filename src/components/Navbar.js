import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false)
    } else {
        setButton(true)
    }
  };

  useEffect(() => {
      showButton();
  }, [])

  window.addEventListener('resize', showButton);

  return (
    <div>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img src="https://ceng.iyte.edu.tr/wp-content/uploads/sites/124/2017/11/iztech-logo-1.png" alt="iyte logo"></img>
            IZTECH ELECTION
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>Home</Link>
            </li>
            <li className='nav-item'>
              <Link to='/announcements' className='nav-links' onClick={closeMobileMenu}>Announcements</Link>
            </li>
            <li className='nav-item'>
              <Link to='/elections' className='nav-links' onClick={closeMobileMenu}>Elections</Link>
            </li>
            <li className='nav-item'>
              <Link to='/logout' className='nav-links-mobile' onClick={closeMobileMenu}>Logout</Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>LOGOUT</Button>}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import './HeroSection.css';

function HeroSection() {
  const name = localStorage.getItem('name');
  const lastName = localStorage.getItem('lastName');
  const userRole = localStorage.getItem('userRole');
  const departmentName = localStorage.getItem('departmentName');
  const year = localStorage.getItem('year');

  const isStudent = userRole === 'Student';

  return (
    <div className='hero-container'>
      <div className='hero-profile'>
        <img src='/student-avatar.png' alt='student image' />
        <div className='hero-info'>
          <div className='hero-role'>{`${userRole}`}</div>
          <div className='hero-major'>{`${departmentName}`}</div>
          <div className='hero-grade'>Year: {`${year}`}</div>
          {isStudent && (
            <Link to='/become-candidate' className='apply-link'>
              <button className='apply-button'>Apply For Candidacy</button>
            </Link>
          )}
        </div>
      </div>
      <div className='hero-main'>
        <h1>{`${name} ${lastName}`}</h1>
      </div>
    </div>
  );
}

export default HeroSection;

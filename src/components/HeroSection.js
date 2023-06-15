import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import './HeroSection.css';
import { Button } from './Button.js';

function HeroSection() {
  const name = localStorage.getItem('name');
  const lastName = localStorage.getItem('lastName');
  const userRole = localStorage.getItem('userRole');
  const departmentName = localStorage.getItem('departmentName');
  const year = localStorage.getItem('year');
  console.log(year);
  const isStudent = userRole === 'Student';

  return (
    <div className='hero-container'>
      <div className='hero-profile'>
        <img src='/student-avatar.png' alt='student image' />
        <div className='hero-info'>
          <div className='hero-role'>{`${userRole}`}</div>
          {departmentName !== "null" && (
  <div className='hero-major'>Department: {departmentName}</div>
)}
          {year !== "null" && (
  <div className='hero-grade'>Year: {year}</div>
)}
          {isStudent && year !== '4' && year !== '1' && (
            <Link to='/become-candidate' className='apply-link'>
              <Button buttonSize='btn--large' buttonStyle='btn--red' className='apply-button'>Apply For Candidacy</Button>
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

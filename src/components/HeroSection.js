import React from 'react';
import '../App.css';
import './HeroSection.css';

function HeroSection() {
  const name = localStorage.getItem('name');
  const lastName = localStorage.getItem('lastName');
  const userRole = localStorage.getItem('userRole');
  const departmentName = localStorage.getItem('departmentName');
  const year = localStorage.getItem('year');

  return (
    <div className='hero-container'>
      <div className='hero-profile'>
        <img src='/student-avatar.png' alt='student image'></img>
        <div className='hero-info'>
          <div className='hero-role'>{`${userRole}`}</div>
          <div className='hero-major'>{`${departmentName}`}</div>
          <div className='hero-grade'>Year : {`${year}`}</div>
        </div>
      </div>
      <div className='hero-main'>
        <h1>{`${name} ${lastName}`}</h1>
      </div>
    </div>
  );
}

export default HeroSection;

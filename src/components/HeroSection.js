import React from 'react';
import '../App.css';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <div className='hero-profile'>
        <img src='/student-avatar.png' alt='student image'></img>
        <div className='hero-info'>
          <div className='hero-role'>User Role</div>
          <div className='hero-major'>User Major</div>
          <div className='hero-grade'>User Grade</div>
        </div>
      </div>
      <div className='hero-main'>
        <h1>User Name</h1>
      </div>
    </div>
  )
}

export default HeroSection
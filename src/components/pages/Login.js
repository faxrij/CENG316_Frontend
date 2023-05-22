import React from 'react';
import '../../App.css';
import { Button } from '../Button';
import './Login.css';


function Login () {

  return(
    <div className='login-page'>
      <div className='login-container'>        
        <div className='login-logo'>
          <img src='https://ceng.iyte.edu.tr/wp-content/uploads/sites/124/2017/11/iztech-logo-1.png' alt='iyte logo'></img>
        </div>
        <p className='login-info'>
          To login, you must use your IYTE OBS username and password.
        </p>
        <div className='login-inputs'>
          <input type='text' id='username' placeholder='username'></input>
          <input type='password' id='password' placeholder='password'></input>
        </div>
        <Button buttonStyle='btn--red'>Login</Button>
      </div>
    
    </div>
    
  )
}

export default Login;
import React, { useState, useContext } from 'react';
import '../../App.css';
import { Button } from '../Button';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';


const Login = () => {
  const { login } = useContext(AuthContext); // Get the login function from AuthContext

  const navigate = useNavigate();

  const handleLogin = async () => {
    login();
    // window.location.href = '/';

    try {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      console.log(username);
      console.log(password);

      // Make the API request to authenticate the user
      // Replace 'your-login-api-url' with your actual login API URL
      // const response = await fetch('your-login-api-url', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ username, password }),
      // });

      // if (response.ok) {
      if (true) {
        console.log("ENTERED");

        // const token = await response.json();

        // Set the authentication state and store the token
        // setAuthenticated(true);
        // localStorage.setItem('token', token);
        navigate('/');
      } 
  //     // else {
  //     //   console.error('Login failed:', response.statusText);
  //     // }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <img
            src="https://ceng.iyte.edu.tr/wp-content/uploads/sites/124/2017/11/iztech-logo-1.png"
            alt="iyte logo"
          />
        </div>
        <p className="login-info">
          To login, you must use your IYTE OBS username and password.
        </p>
        <div className="login-inputs">
          <input type="text" id="username" placeholder="username" />
          <input type="password" id="password" placeholder="password" />
        </div>
        <Button buttonStyle='btn--red' onClick={handleLogin}>Login</Button>
      </div>
    </div>
  );
};

export default Login;

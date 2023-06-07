import React, { useState } from "react";
import "../../App.css";
import { Button } from "../Button";
import "../Login.css";
import "../LoadingCircle.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
	const { login } = useAuth(); // Get the login function and isAuthenticated state from AuthContext
	const navigate = useNavigate();
	const [error, setError] = useState(null);

	const [isLoading, setIsLoading] = useState(false);

	const handleNavigateToHome = () => {
		setIsLoading(true);
		setTimeout(() => {
			navigate("/home");
		}, 500); // Delay for 0.5 seconds (adjust as needed)
	};

	const handleServerError = (message) => {
		setError(message);
	};

	const handleLogin = async () => {
		try {
			const userName = document.getElementById("username").value;
			const password = document.getElementById("password").value;

			const response = await fetch("http://164.90.217.39:5000/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userName, password }),
			});

			if (response.ok) {
				const data = await response.json();
				const token = data.data.token.accessToken;
				const name = data.data.name;
				const lastName = data.data.lastName;
				const userRole = data.data.userRole;
				const departmentName = data.data.departmentName;
				const year = data.data.year;
				const userId = data.data.userId;

				// Set the authentication state and store the token
				localStorage.setItem("token", token);
				localStorage.setItem("name", name);
				localStorage.setItem("lastName", lastName);
				localStorage.setItem("userRole", userRole);
				localStorage.setItem("departmentName", departmentName);
				localStorage.setItem("year", year);
				localStorage.setItem("userId", userId);

				toast.success("Login Successful!");

				login();

				handleNavigateToHome();
			} else {
				if (response.status === 500) {
					handleServerError("Incorrect username or password.");
				} else {
					handleServerError("An error occurred while logging in.");
				}
			}
		} catch (error) {
			console.error("Login failed:", error);
			handleServerError("An error occurred while logging in.");
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
					To log in, please use your IYTE OBS username and password.
				</p>
				<div className="login-inputs">
					<input
						type="text"
						id="username"
						placeholder="Username"
						className="login-input"
					/>
					<input
						type="password"
						id="password"
						placeholder="Password"
						className="login-input"
					/>
				</div>
				<Button buttonStyle="btn--red" onClick={handleLogin}>
					Login
				</Button>

				{/* Display the error modal or notification */}
				{error && (
					<div className="error-modal">
						<p className="error-message">{error}</p>
						<button className="close-button" onClick={() => setError(null)}>
							Close
						</button>
					</div>
				)}
			</div>
			{isLoading && (
      <div className="loading-screen">
        <div className="loading-circles">
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
        </div>
      </div>
    )}
		</div>
	);
};

export default Login;

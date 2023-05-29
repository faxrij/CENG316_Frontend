import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Announcement from "./components/pages/Announcement";
import Elections from "./components/pages/Elections";
import CreateElectionPage from "./components/pages/CreateElectionPage";
import Login from "./components/pages/Login";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VotingPage from "./components/pages/VotingPage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <RouteWrapper />
        </AuthProvider>
        <ToastContainer /> {/* Add ToastContainer to display toast notifications */}
      </Router>
    </div>
  );
};

const RouteWrapper = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const shouldShowNavbar = location.pathname !== "/";

  // if (!isAuthenticated && location.pathname !== "/") {
  //   window.location.href = "/"; // Redirect to login page if not authenticated
  //   return null;
  // }

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/announcements" element={<Announcement />} />
        <Route path="/elections" element={<Elections />} />
        <Route path="/vote" element={<VotingPage />} />
        <Route path="/create-election" element={<CreateElectionPage />} />
      </Routes>
    </>
  );
};

export default App;

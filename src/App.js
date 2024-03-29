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
import BecomeCandidate from "./components/pages/BecomeCandidate";
import EditElectionPage from "./components/pages/EditElection";
import ElectionResultPage from "./components/pages/ElectionResultPage";
import CreateAnnouncement from "./components/pages/CreateAnnouncement";
import { Navigate } from "react-router-dom";
import Reelection from "./components/pages/Reelection";


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

  if (!isAuthenticated && location.pathname !== "/") {
    return <Navigate to="/" replace />; // Use Navigate to navigate to login page
  }

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/announcements" element={<Announcement />} />
        <Route path="/elections" element={<Elections />} />
        <Route path="/vote/:id" element={<VotingPage />} />
        <Route path="/create-election" element={<CreateElectionPage />} />
        <Route path="/become-candidate" element={<BecomeCandidate />} />
        <Route path="/election/:id" element={<EditElectionPage />} />
        <Route path="/election/:id/result" element={<ElectionResultPage />} />
        <Route path="/announcement" element={<CreateAnnouncement />} />
        <Route path="/election/:id/reelection" element={<Reelection />} />

      </Routes>
    </>
  );
};

export default App;

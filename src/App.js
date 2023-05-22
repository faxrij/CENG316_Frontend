import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Announcement from './components/Announcement';
import Elections from './components/Elections';
import CreateElectionPage from './components/CreateElectionPage';
import Login from './components/pages/Login';
import { AuthProvider } from './components/AuthContext';

const App = () => {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <RouteWrapper /> {/* Render the RouteWrapper component */}
        </AuthProvider>
      </Router>
    </div>
  );
};

const RouteWrapper = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/sign-in';

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/" element={<HeroSection />} />
        <Route path="/announcements" element={<Announcement />} />
        <Route path="/elections" element={<Elections />} />
        <Route path="/create-election" element={<CreateElectionPage />} />
      </Routes>
    </>
  );
};

export default App;

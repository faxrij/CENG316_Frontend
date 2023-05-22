import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Announcement from "./components/Announcement";
import CreateElectionPage from "./components/CreateElectionPage";
import Elections from "./components/Elections";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
				<Navbar />
				<Routes>
					<Route path="/" exact />
					<Route path="/announcements" element={<Announcement />} />
					<Route path="/election" element={<Elections />} />
					<Route path="/create-election" element={<CreateElectionPage />} />
				</Routes>
			</Router>
    </div>
  );
}

export default App;

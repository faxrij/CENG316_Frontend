import './App.css';
import Announcement from './components/Announcement';
import Elections from './components/Elections';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact/>
          <Route path='/announcements' exact Component={Announcement} />
          <Route path='/election' exact Component={Elections} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

import Navbar from './components/Navbar'; // adjust path if needed
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dispense from './pages/Dispense'; // create if not yet created
import Connect from './pages/Connect';   // create if not yet created

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-teal-200">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dispense" element={<Dispense />} />
          <Route path="/connect" element={<Connect />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

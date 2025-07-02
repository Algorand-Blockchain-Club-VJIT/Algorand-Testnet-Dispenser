import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Dispense from "./pages/Dispense"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-teal-200">
        <Navbar />
        <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dispense" element={<Dispense />} />
        </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App

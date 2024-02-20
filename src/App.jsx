import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import NavBar from "./components/NavBar"
import Feed from "./pages/Feed"
import Activities from "./pages/Activities"
import About from "./pages/About"
import Register from "./pages/Register"
import Login from "./pages/Login"
import FooterComponent from "./components/FooterComponent"
import Dashboard from "./pages/Dashboard"

function App() {

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <FooterComponent />
      </Router>
    </>
  )
}

export default App

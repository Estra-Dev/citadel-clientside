import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import NavBar from "./components/NavBar"
import Feed from "./pages/Feed"
import Activities from "./pages/Activities"
import About from "./pages/About"
import Register from "./pages/Register"
import Login from "./pages/Login"
import FooterComponent from "./components/FooterComponent"

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
        </Routes>
        <FooterComponent />
      </Router>
    </>
  )
}

export default App

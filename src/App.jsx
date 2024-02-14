import { Button } from "flowbite-react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import NavBar from "./components/NavBar"

function App() {

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route />
        </Routes>
      </Router>
    </>
  )
}

export default App

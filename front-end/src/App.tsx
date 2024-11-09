import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import FrontPage from './FrontPage/FrontPage'
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<FrontPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

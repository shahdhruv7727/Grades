import './App.css'
import SignUpPage from './pages/SignUpPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
function App() {
  return (
      <Router>
        <Routes>
          {/* <Route path='signup' element={<SignUpPage />}/> */}
          <Route path='/' element={<SignUpPage />}/>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router> 
  )
}

export default App

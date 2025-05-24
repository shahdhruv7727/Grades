import './App.css'
import SignUpPage from './pages/SignUpPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import ForgotPassPage from './pages/ForgotPassPage';

function App() {
  return (
      <Router>
        <Routes>
          {/* <Route path='signup' element={<SignUpPage />}/> */}
          <Route path='/' element={<SignUpPage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgotpass" element={<ForgotPassPage />} />
        </Routes>
      </Router> 
  )
}

export default App

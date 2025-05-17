import './App.css'
import SignUpPage from './pages/SignUpPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
      <Router>
        <Routes>
          {/* <Route path='signup' element={<SignUpPage />}/> */}
          <Route path='/' element={<SignUpPage />}/>
        </Routes>
      </Router> 
  )
}

export default App

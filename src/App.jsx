import './App.css'
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';

<Route path="/login" element={<LoginPage />} />


function App() {

  return (
    <>
      <div className="text-5xl font-bold underline">
        Grades 
      </div>
      <SignUpPage/>
    </>
  )
}

export default App

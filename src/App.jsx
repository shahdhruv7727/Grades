import "./App.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./Routes/Routes";

function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <Router>
          <AppRoutes/>
        </Router>
       <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
import React from "react";
import "./App.css";

// React Router
import { BrowserRouter as Router } from "react-router-dom";

// Toasts
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Auth provider
import { AuthProvider } from "./context/AuthContext";

// Your routes tree
import AppRoutes from "./Routes/Routes";

function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>

      {/* Global toasts */}
      <ToastContainer position="top-right" autoClose={5000} newestOnTop={false} />
    </React.Fragment>
  );
}

export default App;

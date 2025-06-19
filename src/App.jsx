import "./App.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import AppRoutes from "./Routes/Routes";
import LoaderPage from "./components/commonFunctions/Loader";

function App() {
  return (
    <React.Fragment>
      <Router>
        <AppRoutes/>
      </Router>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
    </React.Fragment>
  );
}

export default App;

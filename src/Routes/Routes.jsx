import { Routes, Route } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import ForgotPassPage from "../pages/ForgotPassPage";
import LandingPage from "../pages/LandingPage";
import AddStudent from "../components/Modals/AddStudent";
import SideBar from "../components/SideBar";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/student" element={<AddStudent />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgotpass" element={<ForgotPassPage />} />
      <Route path="/sidebar" element={<SideBar />} />
    </Routes>
  );
};

export default AppRoutes;

import { Routes, Route } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import ForgotPassPage from "../pages/ForgotPassPage";
import LandingPage from "../pages/LandingPage";
import AddStudent from "../components/Modals/AddStudent";
import SideBarLayout from "../layout/SideBarLayout";
import ProtectedRoute from "./ProtectedRoute";
import Loader from "../components/commonFunctions/Loader";
import StudentTable from "../pages/Listing";
import StudentList from "../pages/RegistrationForm";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Protected Routes  */}
      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <SideBarLayout
              insideComponent={<AddStudent />}
              label={"Student"}
              nav={"/student"}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <SideBarLayout insideComponent={<LandingPage />} />
          </ProtectedRoute>
        }
      />
      {/* Public Routes  */}
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/forgotpass" element={<ForgotPassPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/loader" element={<Loader />} />
      {/* <Route path="*" element={<Loader />} /> */}
      <Route
        path="/studentt"
        element={
          <SideBarLayout insideComponent={<AddStudent />} label={"Student"} />
        }
      />
      {/* <Route
        path="/loaderr"
        element={<SideBarLayout insideComponent={<Loader />} />}
      /> */}
      <Route
        path="/wha"
        element={<SideBarLayout insideComponent={<StudentTable />} />}
      />
    </Routes>
  );
};

export default AppRoutes;

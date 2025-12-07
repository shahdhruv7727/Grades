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
import FeesFinances from "../pages/FeesAndFinances";
import ClassesManagement from "../pages/ClassesManagament";
import ClassesPage from "../pages/ClassesPage";

// 1) ADD THIS NEW IMPORT
import ClassDetailsPage from "../pages/ClassDetailsPage"; // We will create this in the next step

const AppRoutes = () => {
  return (
    <Routes>
      {/* Protected Routes */}
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
      
      <Route
        path="/classes"
        element={
          // <ProtectedRoute>
            <SideBarLayout
              insideComponent={<ClassesPage />}
              label={"Classes"}
              nav={"/classes"}
            />
          // </ProtectedRoute>
        }
      />

      {/* 2) ADD THIS NEW PROTECTED ROUTE FOR CLASS DETAILS */}
      <Route
        path="/classes/:classId"
        element={
          // <ProtectedRoute>
            <SideBarLayout
              insideComponent={<ClassDetailsPage />}
              label={"Class Details"} // This label will show in your layout
              nav={"/classes"} // This keeps the "Classes" item active in the sidebar
            />
          // </ProtectedRoute>
        }
      />

      {/* Public Routes */}
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/forgotpass" element={<ForgotPassPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/loader" element={<Loader />} />
      <Route path="/fees" element={ <SideBarLayout insideComponent={<FeesFinances />}/>} />
      <Route path="/classes" element={<SideBarLayout insideComponent={<ClassesManagement />} />}/>

      <Route
        path="*"
        element={
          <ProtectedRoute>
            <SideBarLayout insideComponent={<LandingPage />} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/studentt"
        element={<SideBarLayout insideComponent={<LandingPage />} />}
      />
      <Route
        path="/loaderr"
        element={<SideBarLayout insideComponent={<Loader />} />}
      />
      <Route
        path="/wha"
        element={<SideBarLayout insideComponent={<StudentTable />} />}
      />
    </Routes>
  );
};

export default AppRoutes;


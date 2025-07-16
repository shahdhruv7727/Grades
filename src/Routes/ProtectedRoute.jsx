import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from '../components/commonFunctions/Loader';

const ProtectedRoute = ({ children, allowedRoles = 'admin' }) => {
  const { authToken, user, loading } = useAuth();

  // Still checking localStorage/user
  if (loading) return <Loader />;

  if (!authToken || !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

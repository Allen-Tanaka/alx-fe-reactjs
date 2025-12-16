import { Navigate } from "react-router-dom";

const useAuth = () => {
  const isAuthenticated = false; // simulate auth state
  return { isAuthenticated };
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

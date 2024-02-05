import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../router/useAuth";

const RequireAuth = ({ children }) => {
  const location = useLocation();

  const { status } = useAuth();

  if (status ) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} />;
};

export { RequireAuth };

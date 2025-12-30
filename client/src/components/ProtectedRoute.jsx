
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const {user, loading} = useAuth();

  if(loading)  return;

  if (!user) {
    // Redirect to login but save the current location to redirect back after login
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

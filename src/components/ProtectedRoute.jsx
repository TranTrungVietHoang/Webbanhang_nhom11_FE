import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  console.log('[ProtectedRoute] Checking token:', token ? 'EXISTS' : 'NULL');

  // Nếu không có token, redirect về login
  if (!token) {
    console.log('[ProtectedRoute] No token, redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  // Nếu có token, cho phép vào
  console.log('[ProtectedRoute] Token exists, allowing access');
  return children;
};

export default ProtectedRoute;

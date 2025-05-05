import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  userType?: 'loader' | 'receiver';
}

const ProtectedRoute = ({ children, userType }: ProtectedRouteProps) => {
  const { user, isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if user has the correct type for this route
  if (userType && user?.userType !== userType) {
    return <Navigate to={`/dashboard/${user?.userType}`} replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
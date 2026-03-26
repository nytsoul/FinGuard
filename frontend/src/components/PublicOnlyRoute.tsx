import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  // If user is authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // If still loading and NO user found (meaning they're not logged in),
  // render the page anyway - the timeout in AuthContext will handle it
  // This prevents the "Loading session..." blocking public pages
  return <>{children}</>;
}

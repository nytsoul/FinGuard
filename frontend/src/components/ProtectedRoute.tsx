<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { user, loading, isNewUser } = useAuth();
  const [redirect, setRedirect] = useState('');

  useEffect(() => {
    if (!loading) {
      if (!user) {
        setRedirect('/login');
      } else if (isNewUser) {
        // New users must complete their profile first
        setRedirect('/dashboard/profile');
      }
    }
  }, [user, loading, isNewUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600 font-semibold">Loading...</p>
=======
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-surface">
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-primary animate-spin"></div>
          </div>
          <p className="text-sm text-slate-600 font-medium">Verifying your session...</p>
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
        </div>
      </div>
    );
  }

<<<<<<< HEAD
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return <Outlet />;
=======
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
}

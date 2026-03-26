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
        </div>
      </div>
    );
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return <Outlet />;
}

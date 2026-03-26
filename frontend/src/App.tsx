import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSkeleton from './components/LoadingSkeleton';

// Lazy load all page components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Transactions = lazy(() => import('./pages/Transactions'));
const Forecast = lazy(() => import('./pages/Forecast'));
const DecisionEngine = lazy(() => import('./pages/DecisionEngine'));
const ActionComposer = lazy(() => import('./pages/ActionComposer'));
const Invoices = lazy(() => import('./pages/Invoices'));
const Settings = lazy(() => import('./pages/Settings'));
const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const Profile = lazy(() => import('./pages/Profile'));
const VendorDetail = lazy(() => import('./pages/VendorDetail'));
const Help = lazy(() => import('./pages/Help'));
const Preferences = lazy(() => import('./pages/Preferences'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Suspense */}
        <Route 
          path="/" 
          element={
            <Suspense fallback={<LoadingSkeleton fullPage />}>
              <Landing />
            </Suspense>
          } 
        />
        <Route 
          path="/login" 
          element={
            <Suspense fallback={<LoadingSkeleton fullPage />}>
              <Login />
            </Suspense>
          } 
        />
        <Route 
          path="/register" 
          element={
            <Suspense fallback={<LoadingSkeleton fullPage />}>
              <Register />
            </Suspense>
          } 
        />
        <Route 
          path="/help" 
          element={
            <Suspense fallback={<LoadingSkeleton fullPage />}>
              <Help />
            </Suspense>
          } 
        />
        
        {/* Protected Routes - Check auth and redirect if needed */}
        <Route element={<ProtectedRoute />}>
          {/* Onboarding route for new users */}
          <Route 
            path="/onboarding" 
            element={
              <Suspense fallback={<LoadingSkeleton fullPage />}>
                <Onboarding />
              </Suspense>
            } 
          />
          
          {/* Dashboard and nested routes */}
          <Route 
            path="/dashboard" 
            element={
              <Suspense fallback={<LoadingSkeleton fullPage />}>
                <Layout />
              </Suspense>
            }
          >
            <Route 
              index 
              element={
                <Suspense fallback={<LoadingSkeleton fullPage />}>
                  <Dashboard />
                </Suspense>
              } 
            />
            <Route 
              path="transactions" 
              element={
                <Suspense fallback={<LoadingSkeleton fullPage />}>
                  <Transactions />
                </Suspense>
              } 
            />
            <Route 
              path="forecast" 
              element={
                <Suspense fallback={<LoadingSkeleton fullPage />}>
                  <Forecast />
                </Suspense>
              } 
            />
            <Route 
              path="decision-engine" 
              element={
                <Suspense fallback={<LoadingSkeleton fullPage />}>
                  <DecisionEngine />
                </Suspense>
              } 
            />
            <Route 
              path="actions" 
              element={
                <Suspense fallback={<LoadingSkeleton fullPage />}>
                  <ActionComposer />
                </Suspense>
              } 
            />
            <Route 
              path="invoices" 
              element={
                <Suspense fallback={<LoadingSkeleton fullPage />}>
                  <Invoices />
                </Suspense>
              } 
            />
            <Route 
              path="vendor/:vendorName" 
              element={
                <Suspense fallback={<LoadingSkeleton fullPage />}>
                  <VendorDetail />
                </Suspense>
              } 
            />
            <Route 
              path="settings" 
              element={
                <Suspense fallback={<LoadingSkeleton fullPage />}>
                  <Settings />
                </Suspense>
              } 
            />
            <Route 
              path="profile" 
              element={
                <Suspense fallback={<LoadingSkeleton fullPage />}>
                  <Profile />
                </Suspense>
              } 
            />
            <Route 
              path="preferences" 
              element={
                <Suspense fallback={<LoadingSkeleton fullPage />}>
                  <Preferences />
                </Suspense>
              } 
            />
          </Route>
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // You might want to create a proper loading component
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
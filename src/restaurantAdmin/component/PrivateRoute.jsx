// PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const PrivateRoute = () => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;

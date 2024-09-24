import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
  const { currentUser, roleData } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/auth" />;
  }

  // New logic for database roles
  const isRestaurantAdminDB = roleData?.role === 'Partner' && roleData?.serviceCategory === 'Restaurant';
  const isMasterAdminDB = roleData?.role === 'Admin';

  // Check if the user has the required roles
  if (allowedRoles.includes('restaurantAdmin') && !(roleData?.isRestaurantAdmin || isRestaurantAdminDB)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  if (allowedRoles.includes('masterAdmin') && !(roleData?.isMasterAdmin || isMasterAdminDB)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;

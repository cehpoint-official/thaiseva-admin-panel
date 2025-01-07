import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { currentUser, roleData } = useAuth();
  const location = useLocation();

  const [isScreenSmall, setIsScreenSmall] = useState(false);

  const checkScreenSize = () => {
    const minWidth = 900; // Minimum width for the application
    setIsScreenSmall(window.innerWidth < minWidth);
  };

  useEffect(() => {
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  if (!currentUser) {
    return <Navigate to="/auth" />;
  }

  // New logic for database roles
  const isMasterAdminDB = roleData?.role === "Admin";

  // Check if the user has the required roles

  // if (allowedRoles.includes('masterAdmin') && !(roleData?.isMasterAdmin || isMasterAdminDB)) {
  //   return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  // }

  return (
    <>
      {isScreenSmall ? (
        <div className="fixed w-full h-full bg-slate-100 flex flex-col items-center justify-center text-black text-center">
          <h1 className="text-3xl font-bold mb-4">Screen Too Small</h1>
          <p className="text-lg">
            Please open this application on a laptop or desktop for the best
            experience.
          </p>
        </div>
      ) : (
        <>
          <Outlet />
        </>
      )}
    </>
  );
};

export default PrivateRoute;

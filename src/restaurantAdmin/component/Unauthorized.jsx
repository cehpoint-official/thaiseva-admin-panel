// Unauthorized.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  const [isScreenSmall, setIsScreenSmall] = useState(false);

  const checkScreenSize = () => {
    const minWidth = 768; // Minimum width for the application
    setIsScreenSmall(window.innerWidth < minWidth);
  };

  useEffect(() => {
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-3xl font-bold text-red-600">Unauthorized</h1>
            <p className="mt-4 text-gray-600">
              You do not have permission to view this page.
            </p>
            <div className="mt-6">
              <button
                onClick={goBack}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Unauthorized;

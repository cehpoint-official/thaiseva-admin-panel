import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

const LogOut = () => {
  const navigate = useNavigate();

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

  const handleLogOut = async () => {
    try {
        await signOut(auth);
        navigate('/auth');
    } catch (error) {
        console.error('Error logging out: ', error);
    }
};

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
        <div className=" bg-slate-200 h-[100vh] flex items-center justify-center">
          <div className="bg-white h-[20rem] w-[28rem] rounded-xl text-center p-10">
            <i class="bi bi-box-arrow-right text-5xl text-white mb-4 font-bold bg-[#ff2d2d] p-2 px-4  rounded-full"></i>
            <p className=" text-3xl mt-8 mb-12 ">
              Are you sure! You want to log out
            </p>
            <div className="flex gap-2 items-center justify-center">
              <Link
                to="/foodAdmin"
                className="p-2 w-24 text-lg text-white font-semibold rounded-lg bg-slate-600"
              >
                Cancle
              </Link>
              <button onClick={handleLogOut} className="p-2 w-24 text-lg text-white font-semibold rounded-lg bg-blue-600">
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogOut;

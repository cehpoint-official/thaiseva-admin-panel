import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useAuth } from "../../AuthContext";

const Home = () => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow((prev) => !prev); // Toggles the modal visibility
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Redirect to /auth if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, [currentUser, navigate]);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/auth");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (show && !event.target.closest(".modal")) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [show]);

  return (
    <div className="w-screen h-screen flex p-12 bg-gray-900">
      {/* Left side: Notes */}
      <div className="relative bg-yellow-100 text-black rounded-md w-[40%] h-full flex flex-col justify-center p-6">
        {/* Ping Circle */}
        <div className="absolute -top-2 -right-2">
          <div className="relative">
            <span className="flex h-6 w-6">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-6 w-6 bg-red-500"></span>
            </span>
          </div>
        </div>

        <h3 className="font-bold mb-2">Note for Visitors:</h3>
        <ul className="list-disc ml-6">
          <li>
            <span className="font-bold">
              This page is just for demo purposes
            </span>{" "}
            and is not completed yet.
          </li>
          <li>
            The <span className="font-bold">"Restaurant Admin"</span> and{" "}
            <span className="font-bold">"Food Admin"</span> buttons are
            temporarily placed here for development and testing purposes and
            will not be visible on the final page.
          </li>
          <li>
            Navigation to the{" "}
            <span className="font-bold">"Restaurant Admin"</span> page is
            allowed if your role in the <strong>users</strong> database is
            either:
            <ul className="list-decimal ml-6">
              <li>
                <span className="font-bold">Role = Partner</span>
              </li>
              <li>
                <span className="font-bold">isRestaurantAdmin = true</span>
              </li>
            </ul>
          </li>
          <li>
            Navigation to the <span className="font-bold">"Food Admin"</span>{" "}
            page is allowed if your role in the <strong>users</strong> database
            is either:
            <ul className="list-decimal ml-6">
              <li>
                <span className="font-bold">Role = Admin</span>
              </li>
              <li>
                <span className="font-bold">isMasterAdmin = true</span>
              </li>
            </ul>
          </li>
          <li>
            <span className="font-bold">
              Currently, both the role and admin type are being checked.
            </span>{" "}
            If there are more logic conditions for accessing these sections,
            they have not been implemented yet.
          </li>
          <li>
            <span className="animate-pulse text-red-600 font-bold">
              Important:
            </span>{" "}
            For demo purposes, you can use the following credentials to test
            both Restaurant Admin and Food Admin sections:
            <p>
              <strong>*</strong> Email: <strong>arn@gmail.com</strong>
            </p>
            <p>
              <strong>*</strong> Password: <strong>arn@gmail.com</strong>
            </p>
          </li>
        </ul>
      </div>

      {/* Right side: User details and buttons */}
      <div className=" text-white p-10 w-[60%] flex flex-col items-center justify-center gap-8">
        <span className="flex items-center justify-center flex-col">
          <h2>Your details: </h2>
          <span className="border-gray-400 border px-5 py-2 rounded-md">
            <p>
              <strong>User Email:</strong> {currentUser?.email}
            </p>
            <p>
              <strong>UID :</strong> {currentUser?.uid}
            </p>
          </span>
        </span>

        {/* Links for testing purposes */}
        <Link
          to={`restaurantAdmin/${currentUser?.uid}`}
          className="border-2 text-white w-48 py-2 flex items-center justify-center rounded-full bg-blue-600"
        >
          Restaurant Admin
        </Link>

        <Link
          to={`foodAdmin`}
          className="border-2 text-white w-48 py-2 flex items-center justify-center rounded-full bg-blue-600"
        >
          Food Admin
        </Link>

        <button onClick={toggle} className="bg-red-500 px-4 py-2 rounded-full">
          Logout
        </button>

        {show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white h-[20rem] w-[28rem] rounded-xl text-center p-10 modal">
              <i className="bi bi-box-arrow-right text-5xl text-white mb-4 font-bold bg-[#ff2d2d] p-2 px-4 rounded-full"></i>
              <p className="text-3xl mt-8 mb-12 text-blue-900 font-semibold">
                Are you sure you want to log out?
              </p>
              <div className="flex gap-2 items-center justify-center">
                <button
                  onClick={() => setShow(false)} // Close the modal on "Cancel"
                  className="p-2 w-24 text-lg text-white font-semibold rounded-lg bg-slate-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogOut}
                  className="p-2 w-24 text-lg text-white font-semibold rounded-lg bg-blue-600"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

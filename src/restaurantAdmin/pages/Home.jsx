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

  // Redirect to /auth if not logged in or to /{userId} if logged in
  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    } else {
      navigate(`/${currentUser.uid}`); // Assuming uid is the user ID
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
    <>
      Home page
    </>
  );
};

export default Home;

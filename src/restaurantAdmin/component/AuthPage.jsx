import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebaseConfig"; // Import Firestore config
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore methods
import {
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaExclamationCircle,
} from "react-icons/fa";

const AuthPageAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Added name field
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    document.title = "Thaiseva | Auth";
  }, []);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value); // Handle name change
  const toggleAuthMode = () => setIsSignUp((prev) => !prev);

  // Function to store user details in Firestore with default values
  const storeUserInFirestore = async (user) => {
    await setDoc(doc(db, "users", user.uid), {
      name: name, // Name of the user
      email: user.email,
      isUser: true, // Default isUser to true
      isRestaurantAdmin: false, // Default isRestaurantAdmin to false
      isMasterAdmin: false, // Default isMasterAdmin to false
      createdAt: new Date(),
      userId: user.uid,
    });
  };

  const handleEmailPasswordAuth = async () => {
    try {
      setError("");
      if (isSignUp) {
        // Sign up user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Store default user data in Firestore after sign-up
        await storeUserInFirestore(user);

        // Fetch user data after successful sign-up
        await fetchUserData(user.uid);
      } else {
        // Sign in user
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Fetch user data after successful sign-in
        await fetchUserData(user.uid);
      }
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setError("");
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store default user data after Google sign-in
      await storeUserInFirestore(user);

      // Fetch user data after Google sign-in
      await fetchUserData(user.uid);

      navigate(`/`);
    } catch (error) {
      setError(error.message);
    }
  };

  // Fetch user data from Firestore
  const fetchUserData = async (userId) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("User data:", docSnap.data());
        // Handle the fetched data (e.g., set state or route user based on role)
      } else {
        console.log("No such user!");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800">Thaiseva</h1>
              <h2 className="text-2xl font-semibold text-gray-600 mt-2">
                {isSignUp ? "Sign Up" : "Sign In"}
              </h2>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              {isSignUp && ( // Show name field only during sign-up
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <div className="flex items-center border-2 rounded-lg px-3 py-2 focus-within:border-blue-500 transition duration-300">
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={handleNameChange}
                      className="w-full focus:outline-none"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>
              )}
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="flex items-center border-2 rounded-lg px-3 py-2 focus-within:border-blue-500 transition duration-300">
                  <FaEnvelope className="text-gray-400 mr-2" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full focus:outline-none"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="flex items-center border-2 rounded-lg px-3 py-2 focus-within:border-blue-500 transition duration-300">
                  <FaLock className="text-gray-400 mr-2" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full focus:outline-none"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <FaExclamationCircle className="inline mr-2" />
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <button
                onClick={handleEmailPasswordAuth}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>
            <div className="mt-6">
              <button
                onClick={handleGoogleAuth}
                className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-3 px-4 rounded-lg flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:shadow-outline transition duration-300"
              >
                <FaGoogle className="mr-2 text-red-500" /> Sign In with Google
              </button>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={toggleAuthMode}
                className="text-blue-500 hover:text-blue-600 text-sm focus:outline-none focus:underline transition duration-300"
              >
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Need an account? Sign Up"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthPageAdmin;

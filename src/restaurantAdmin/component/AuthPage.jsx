import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { FaGoogle, FaEnvelope, FaLock, FaExclamationCircle } from 'react-icons/fa';

const AuthPageAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const toggleAuthMode = () => setIsSignUp((prev) => !prev);

    const handleEmailPasswordAuth = async () => {
        try {
            setError('');
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleAuth = async () => {
        const provider = new GoogleAuthProvider();
        try {
            setError('');
            await signInWithPopup(auth, provider);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Thaiseva</h1>
                    <h2 className="text-2xl font-semibold text-gray-600 mt-2">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
                </div>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <FaExclamationCircle className="inline mr-2" />
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                    <button
                        onClick={handleEmailPasswordAuth}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
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
                        {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPageAdmin;
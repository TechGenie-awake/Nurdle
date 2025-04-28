import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // Make sure your firebase configuration is correctly imported

// Import components
import Home from "./Components/Home"; // Home component
import LoginPage from "./Components/LoginPage"; // LoginPage component
import SignUpPage from "./Components/SignUpPage"; // SignUpPage component
import ProfilePage from "./Components/ProfilePage"; // ProfilePage component
import FocusPage from "./Components/FocusPage"; // FocusPage component
import FloatingIcons from "./Components/FloatingIcons"; // FloatingIcons component

const App = () => {
  const [user, setUser] = useState(null); // State to store user data
  const navigate = useNavigate(); // Navigate hook for redirection

  // Check authentication status on load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the authenticated user if logged in
      } else {
        setUser(null); // Set the user to null if not logged in
      }
    });

    return () => unsubscribe(); // Clean up the listener when the component unmounts
  }, []);

  // Handle successful login
  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser); // Update the user state
    navigate("/"); // Redirect to home page after login
  };

  // Handle successful sign-up
  const handleSignUpSuccess = (newUser) => {
    setUser(newUser); // Update the user state
    navigate("/"); // Redirect to home page after sign-up
  };

  return (
    <>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home user={user} />} />

        {/* Login Route */}
        <Route
          path="/login"
          element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
        />

        {/* SignUp Route */}
        <Route
          path="/signup"
          element={<SignUpPage onSignUpSuccess={handleSignUpSuccess} />}
        />

        {/* Profile Route */}
        <Route path="/profile" element={<ProfilePage user={user} />} />

        {/* FocusPage Route */}
        <Route path="/focus-page" element={<FocusPage />} />
      </Routes>
      <FloatingIcons />
    </>
  );
};

export default App;

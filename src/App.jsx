import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // Make sure your firebase configuration is correctly imported

// Import components
import Home from "./Components/Home";
import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/SignUpPage";
import ProfilePage from "./Components/ProfilePage";
import FocusPage from "./Components/FocusPage";
import FloatingIcons from "./Components/FloatingIcons";

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    navigate("/");
  };

  const handleSignUpSuccess = (newUser) => {
    setUser(newUser);
    navigate("/");
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route
          path="/login"
          element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/signup"
          element={<SignUpPage onSignUpSuccess={handleSignUpSuccess} />}
        />
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route path="/focus-page" element={<FocusPage user={user} />} />
      </Routes>
      <FloatingIcons />
    </>
  );
};

export default App;

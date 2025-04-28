import React, { useState } from "react";
import { auth, db } from "../firebase"; // Ensure Firebase is configured correctly
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignUpPage = ({ onSignUpSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Track username input
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Set display name
      await updateProfile(user, {
        displayName: username,
      });

      // Reload user to ensure displayName is updated
      await user.reload();
      const updatedUser = auth.currentUser;

      // Store additional user data in Firestore
      await setDoc(doc(db, "users", updatedUser.uid), {
        username: username,
        email: updatedUser.email,
      });

      // Trigger parent callback
      onSignUpSuccess(updatedUser);
      navigate("/"); // Redirect to homepage
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 text-white">
      <form
        onSubmit={handleSignUp}
        className="p-8 bg-gray-900 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-3xl mb-6 text-center">Sign Up</h2>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}

        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl bg-gray-700 text-white"
          required
        />

        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl bg-gray-700 text-white"
          required
        />

        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-xl bg-gray-700 text-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;

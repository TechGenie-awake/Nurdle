import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
      navigate("/");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
      console.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 text-white">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-gray-900 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-3xl mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl bg-gray-700 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-xl bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700"
        >
          Login
        </button>

        {/* Link to Sign Up */}
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

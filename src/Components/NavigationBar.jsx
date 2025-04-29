import React from "react";
import { Link } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa6";

const NavigationBar = ({ user }) => {
  const username = user?.displayName || "Guest"; // Fallback to "Guest" if no displayName is set
  console.log("Current User: ", user);
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-black/10 backdrop-blur-[2px] text-white shadow-md h-22 pb-3">
      <div className="w-[95%] mt-[-10px] mx-2 px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-7xl md:text-8xl font-extrabold mt-5 tracking-wide text-white"
          style={{
            fontFamily: "'Party', sans-serif",
            WebkitTextStroke: "2px #ADD8E6", // 2px black stroke around the white text
            color: "white",
          }}
        >
          Nurdle
        </div>

        {/* Navigation and Profile Icon */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* Display Username */}
              <span
                className="text-white font-bold text-lg bg-gray-800 rounded px-2 py-1 shadow-md"
                style={{
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)", // Text shadow for better visibility
                }}
              >
                {username}
              </span>
              {/* Profile Link */}
              <Link to="/profile">
                <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-white/30 cursor-pointer">
                  <FaUserGraduate size={20} />
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-full text-sm font-medium transition">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-sm font-medium transition">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;

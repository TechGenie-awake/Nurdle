import React from "react";
import { useNavigate } from "react-router-dom";

const ToFocus = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/focus-page"); // Navigate to the focus page
  };

  return (
    <>
      {/* Floating Focus Button */}
      <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-40">
        <div className="relative group flex items-center justify-center">
          {/* Soft glow circle with purplish tone */}
          <div
            className="absolute w-[680px] h-[480px] rounded-full 
            bg-gradient-to-br from-[#3d60fd] via-[#3b7cf6] to-[#1a81ff]
            opacity-0 group-hover:opacity-40 blur-3xl 
            transition-opacity duration-1000 pointer-events-none"
          ></div>

          {/* Button */}
          <button
            onClick={handleClick}
            className="relative text-white text-9xl font-semibold px-14 py-7 z-10
            transition-all duration-1000 ease-in-out hover:text-white hover:[text-shadow:0_0_10px_#3289bf,0_0_20px_#3289bf,0_0_30px_#3289bf]"
            style={{
              animation: "pulse 3s ease-in-out infinite",
              fontFamily: "'Qurova', sans-serif",
              WebkitTextStroke: "5px #ADD8E6", // 2px black stroke around the white text
              color: "rgba(255, 255, 255, 1)",
            }}
          >
            Focus
          </button>
        </div>
      </div>

      {/* Define keyframes manually */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </>
  );
};

export default ToFocus;

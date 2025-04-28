import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import BackgroundSwitcher from "./BackgroundSwitcher";
import NavigationBar from "./NavigationBar";
import ToFocus from "./ToFocus";

const studyTips = [
  "🎯 Stay consistent, not perfect.",
  "📚 Study smarter, not longer.",
  "🧠 Take breaks to boost memory.",
  "✅ Break tasks into smaller goals.",
  "💧 Stay hydrated and stretch.",
  "🎵 Use ambient music to stay focused.",
  "📝 Rewrite notes to reinforce learning.",
  "⏰ Use a timer to avoid burnout.",
  "🌿 A tidy space helps a tidy mind.",
  "👥 Teach someone else to test yourself.",
  "📵 Turn off notifications to stay in the zone.",
  "🌞 Start with the hardest task when you're most alert.",
  "💤 Sleep well—your brain needs rest to remember.",
  "🧘‍♀️ Take deep breaths to manage stress.",
  "🔁 Review regularly, not just before exams.",
  "🏆 Celebrate small wins to stay motivated.",
  "📈 Track your progress to see how far you’ve come.",
  "🍎 Snack healthy to keep your brain fueled.",
  "🎯 Set clear goals before each session.",
  "💡 Don’t just read—quiz yourself!",
];

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tipIndex, setTipIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setIsLoggedIn(true);
        setUser(firebaseUser);
        setUsername(firebaseUser.displayName || "User");
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setUsername("");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setTipIndex((prevIndex) => (prevIndex + 1) % studyTips.length);
    }, 5000);

    return () => clearInterval(tipInterval);
  }, []);

  const handleGetStarted = () => {
    navigate("/login");
  };

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <BackgroundSwitcher user={auth.currentUser}>
      <div className="relative h-screen w-full flex flex-col items-center text-white">
        {/* Navbar */}
        <NavigationBar user={user} username={username} />

        {/* Time in top center */}
        {isLoggedIn && (
          <div className="absolute top-[15vh] left-1/2 transform -translate-x-1/2 text-9xl font-extrabold text-center text-white bg-black/20 p-4 rounded-lg">
            {formattedTime}
          </div>
        )}
        {/* Study Tip in top-right corner */}
        {isLoggedIn && (
          <div className="absolute w-[23vw] top-20 right-5 px-6 py-4 rounded-lg text-2xl text-right text-white transition-all duration-700 ease-in-out opacity-100 transform scale-100 hover:scale-105">
            {studyTips[tipIndex]}
          </div>
        )}

        {/* Main Welcome Content */}
        <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
          {!isLoggedIn ? (
            <>
              <h1 className="text-4xl mb-4 font-semibold">
                Stay Organized, Stay Creative
              </h1>
              <button
                onClick={handleGetStarted}
                className="bg-purple-600 text-white px-6 py-3 rounded-full text-xl transition-all duration-300 hover:bg-purple-700"
              >
                Get Started
              </button>
            </>
          ) : (
            <>
              <div className="bg-black/20 px-6 py-4 rounded-xl shadow-lg text-white text-center">
                <h1 className="text-5xl font-bold mb-4">
                  Welcome back, {username}! 👋
                </h1>
                <p className="text-2xl font-bold mb-6">
                  Let’s make today productive.
                </p>
                <p className="text-xl font-bold animate-bounce text-indigo-300 [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)]">
                  ↓ Head to the{" "}
                  <span className="text-2xl text-pink-400 font-bold">
                    Focus
                  </span>{" "}
                  section below ↓
                </p>
              </div>
            </>
          )}
        </div>

        {/* Focus Section */}
        <ToFocus />
      </div>
    </BackgroundSwitcher>
  );
};

export default Home;

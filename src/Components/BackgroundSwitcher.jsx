import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { MdSwitchAccessShortcutAdd } from "react-icons/md";
import { db } from "../firebase";

// 🟣 Background videos
import Zzzora from "../assets/Background/Zzzora.mp4";
import Mossmere from "../assets/Background/Mossmere.mp4";
import Pondle from "../assets/Background/Pondle.mp4";
import Skylume from "../assets/Background/Skylume.mp4";
import Snughuff from "../assets/Background/Snughuff.mp4";
import Solace from "../assets/Background/Solace.mp4";
import Whiskerpeek from "../assets/Background/Whiskerpeek.mp4";

// 🔵 Background button icons
import ZzzoraButton from "../assets/Background/ZzzoraButton.png";
import MossmereButton from "../assets/Background/MossmereButton.png";
import PondleButton from "../assets/Background/PondleButton.png";
import SkylumeButton from "../assets/Background/SkylumeButton.png";
import SnughuffButton from "../assets/Background/SnughuffButton.png";
import SolaceButton from "../assets/Background/SolaceButton.png";
import WhiskerpeekButton from "../assets/Background/WhiskerpeekButton.png";

const videoBackgrounds = {
  default: { src: Pondle, label: "Pondle", icon: PondleButton },
  Zzzora: { src: Zzzora, label: "Zzzora", icon: ZzzoraButton },
  Mossmere: { src: Mossmere, label: "Mossmere", icon: MossmereButton },
  Skylume: { src: Skylume, label: "Skylume", icon: SkylumeButton },
  Solace: { src: Solace, label: "Solace", icon: SolaceButton },
  Whiskerpeek: {
    src: Whiskerpeek,
    label: "Whiskerpeek",
    icon: WhiskerpeekButton,
  },
  Snughuff: { src: Snughuff, label: "Snughuff", icon: SnughuffButton },
};

export default function BackgroundSwitcher({ user, children }) {
  const [currentBg, setCurrentBg] = useState("default");
  const [open, setOpen] = useState(false);

  // 🧠 Load user's saved background on first load
  useEffect(() => {
    const loadUserBackground = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          if (data.background && videoBackgrounds[data.background]) {
            setCurrentBg(data.background);
          }
        }
      }
    };
    loadUserBackground();
  }, [user]);

  // ✨ Change background + save it to Firestore
  const handleChangeBg = async (key) => {
    setCurrentBg(key);
    setOpen(false);

    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { background: key });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 🔁 Video Background */}
      <video
        key={currentBg}
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src={videoBackgrounds[currentBg].src}
        autoPlay
        loop
        muted
      />
      <div className=" absolute right-0 top-11 mt-2 text-xs bg-black/50 text-white py-1 px-2 rounded-full shadow-md z-50">
        Bg Switcher
      </div>
      {/* ☰ Dropdown Button */}
      <div className="absolute top-2 right-5 z-50">
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/40 text-white shadow-lg text-2xl flex items-center justify-center"
          >
            <MdSwitchAccessShortcutAdd size={24} />
          </button>

          {open && (
            <div className="mt-3 space-y-2 flex flex-col items-end bg-black/40 p-2 rounded-xl backdrop-blur-sm">
              {Object.entries(videoBackgrounds).map(
                ([key, { label, icon }]) => (
                  <div className="relative group" key={key}>
                    <button
                      onClick={() => handleChangeBg(key)}
                      className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md hover:ring-4 hover:ring-blue-300 transition-all duration-200 flex items-center justify-center bg-gray-700"
                    >
                      <img
                        src={icon}
                        alt={label}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </button>
                    <span className="absolute right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {label}
                    </span>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* 👇 Child routes/components go here */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

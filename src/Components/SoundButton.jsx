import React, { useState, useRef } from "react";
import { FaVolumeUp, FaPlay, FaPause } from "react-icons/fa";

// Nature Sounds
import CalmRain from "../assets/Sounds/CalmRain.mp3";
import HeavyThunder from "../assets/Sounds/HeavyThunder.mp3";
import RainChimes from "../assets/Sounds/RainChimes.mp3";
import RainAndThunder from "../assets/Sounds/RainAndThunder.mp3";
import RainAndWaterfall from "../assets/Sounds/RainAndWaterfall.mp3";
import RainyTown from "../assets/Sounds/RainyTown.mp3";
import SoftRain from "../assets/Sounds/SoftRain.mp3";
import GentleWaves from "../assets/Sounds/GentleWaves.mp3";
import OceanWaves from "../assets/Sounds/OceanWaves.mp3";
import SeaWaves from "../assets/Sounds/SeaWaves.mp3";
import ZenRiver from "../assets/Sounds/ZenRiver.mp3";
import MountainWaterfall from "../assets/Sounds/MountainWaterfall.mp3";
import ForestAir from "../assets/Sounds/ForestAir.mp3";
import NightAmbience from "../assets/Sounds/NightAmbience.mp3";
import Snowfall from "../assets/Sounds/Snowfall.mp3";
import EpicStorm from "../assets/Sounds/EpicStorm.mp3";
import NatureThunder from "../assets/Sounds/NatureThunder.mp3";

// Urban / Indoor
import CityAmbience from "../assets/Sounds/CityAmbience.mp3";
import StreetSounds from "../assets/Sounds/StreetSounds.mp3";
import DistantTraffic from "../assets/Sounds/DistantTraffic.mp3";
import LibraryQuiet from "../assets/Sounds/LibraryQuiet.mp3";
import Typing from "../assets/Sounds/Typing.mp3";
import ClockTicking from "../assets/Sounds/ClockTicking.mp3";

// Meditative
import AmbientFlow from "../assets/Sounds/AmbientFlow.mp3";
import MeditationPad from "../assets/Sounds/MeditationPad.mp3";
import FireCrackle from "../assets/Sounds/FireCrackle.mp3";
import SpaceHum from "../assets/Sounds/SpaceHum.mp3";
import LowHum from "../assets/Sounds/LowHum.mp3";
import HorrorAmbience from "../assets/Sounds/HorrorAmbience.mp3";

const sounds = {
  nature: {
    CalmRain: { path: CalmRain, emoji: "🌧️" },
    HeavyThunder: { path: HeavyThunder, emoji: "🌩️" },
    RainChimes: { path: RainChimes, emoji: "🎐" },
    RainAndThunder: { path: RainAndThunder, emoji: "⛈️" },
    RainAndWaterfall: { path: RainAndWaterfall, emoji: "🐸" },
    RainyTown: { path: RainyTown, emoji: "🏙️" },
    SoftRain: { path: SoftRain, emoji: "🌦️" },
    GentleWaves: { path: GentleWaves, emoji: "🐋" },
    OceanWaves: { path: OceanWaves, emoji: "🌊" },
    SeaWaves: { path: SeaWaves, emoji: "🪼" },
    ZenRiver: { path: ZenRiver, emoji: "🐠" },
    MountainWaterfall: { path: MountainWaterfall, emoji: "🏞️" },
    ForestAir: { path: ForestAir, emoji: "🌲" },
    NightAmbience: { path: NightAmbience, emoji: "🌙" },
    Snowfall: { path: Snowfall, emoji: "❄️" },
    EpicStorm: { path: EpicStorm, emoji: "⚡" },
    NatureThunder: { path: NatureThunder, emoji: "🌩️" },
  },
  urbanIndoor: {
    CityAmbience: { path: CityAmbience, emoji: "🏙️" },
    StreetSounds: { path: StreetSounds, emoji: "🚗" },
    DistantTraffic: { path: DistantTraffic, emoji: "🚦" },
    LibraryQuiet: { path: LibraryQuiet, emoji: "📚" },
    Typing: { path: Typing, emoji: "⌨️" },
    ClockTicking: { path: ClockTicking, emoji: "⏰" },
  },
  meditative: {
    AmbientFlow: { path: AmbientFlow, emoji: "🌿" },
    MeditationPad: { path: MeditationPad, emoji: "🧘‍♀️" },
    FireCrackle: { path: FireCrackle, emoji: "🔥" },
    SpaceHum: { path: SpaceHum, emoji: "🌌" },
    LowHum: { path: LowHum, emoji: "🗣️" },
    HorrorAmbience: { path: HorrorAmbience, emoji: "🎃" },
  },
};

const SoundButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  const toggleSound = (soundName, soundPath) => {
    if (currentSound === soundName && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (currentSound !== soundName) {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        const newAudio = new Audio(soundPath);
        newAudio.volume = volume;
        newAudio.loop = true; // 🔁 Enable looping
        audioRef.current = newAudio;
        setCurrentSound(soundName);
      }
      audioRef.current.play().catch((err) => console.error("Play error:", err));
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const renderCategory = (title, colorClass, categoryKey) => (
    <div className="mb-4">
      <h4 className={`font-semibold text-2xl mb-2 py-5 ${colorClass}`}>
        {title}
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {Object.entries(sounds[categoryKey]).map(([key, sound]) => (
          <button
            key={key}
            className={`bg-white/10 hover:bg-white/20 transition-all p-4 rounded-lg flex flex-col items-center justify-center ${
              currentSound === key ? "ring-2 ring-white" : ""
            }`}
            onClick={() => toggleSound(key, sound.path)}
          >
            <span className="text-2xl mb-2">{sound.emoji}</span>
            <span className="text-sm font-semibold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-300 to-purple-300">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative">
      <button
        className="bg-white p-3 rounded-full shadow-xl hover:bg-gray-200 transition"
        onClick={() => setModalOpen((prev) => !prev)}
      >
        <FaVolumeUp size={20} />
      </button>

      {isModalOpen && (
        <div className="absolute bottom-16 right-0 z-50 w-[600px] h-[600px] overflow-hidden rounded-xl backdrop-blur-md bg-black/60 text-white shadow-2xl p-6 animate-fadeIn">
          <div className="sticky top-0 bg-black/5 z-40 p-0">
            <h3 className="font-semibold text-lg mb-4 text-center">
              🌿 Ambient Sounds
            </h3>
          </div>

          <div className="overflow-y-auto max-h-[400px] mb-4">
            {renderCategory("🌳 Nature", "text-teal-400", "nature")}
            {renderCategory("🏙️ Urban/Indoor", "text-blue-300", "urbanIndoor")}
            {renderCategory(
              "🧘‍♀️ Meditative",
              "bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-red-600",
              "meditative"
            )}
          </div>

          <div className="sticky bottom-0 p-3 bg-black/30">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-white"
            />
            <span className="text-xs text-gray-300">Volume</span>
            <div className="flex gap-4 justify-center mt-3">
              <button
                className={`hover:scale-110 transition p-2 rounded-full ${
                  isPlaying ? "bg-white text-black scale-110" : "bg-white/20"
                }`}
                onClick={() => {
                  audioRef.current?.play();
                  setIsPlaying(true);
                }}
              >
                <FaPlay size={18} />
              </button>
              <button
                className={`hover:scale-110 transition p-2 rounded-full ${
                  !isPlaying ? "bg-white text-black scale-110" : "bg-white/20"
                }`}
                onClick={() => {
                  audioRef.current?.pause();
                  setIsPlaying(false);
                }}
              >
                <FaPause size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoundButton;

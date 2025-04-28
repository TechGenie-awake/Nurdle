import React, { useState } from "react";
import { FaMusic } from "react-icons/fa";
import "./MusicButton.css";

const MusicButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("spotify");

  const handlePlatformSwitch = (platform) => {
    setSelectedPlatform(platform);
  };

  return (
    <div className="relative">
      <button
        className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FaMusic size={20} />
      </button>
      <div
        className={`absolute bottom-16 right-0 z-50 w-[600px] h-[600px] overflow-hidden rounded-xl backdrop-blur-md bg-black/60 text-white shadow-2xl p-6 animate-fadeIn ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="sticky flex justify-between items-center top-0 z-40 p-0">
          <h3 className="font-semibold text-lg mb-4 text-center">
            🌿 Ambient Music
          </h3>
          {/* Platform Toggle (YouTube / Spotify) */}
          <div className="flex justify-center gap-8 mb-4">
            <div
              className={`flex items-center gap-2 px-2 cursor-pointer transition-all ${
                selectedPlatform === "youtube"
                  ? "border-2 border-white/5 rounded-lg glow-red"
                  : "opacity-70"
              }`}
              onClick={() => handlePlatformSwitch("youtube")}
            >
              <img
                src="https://www.freeiconspng.com/thumbs/youtube-logo-png/hd-youtube-logo-png-transparent-background-20.png"
                alt="YouTube"
                className="w-10 h-10"
              />
              <span className="text-xl font-normal tracking-wide text-white">
                YouTube
              </span>
            </div>
            <div
              className={`flex items-center gap-1 px-2 cursor-pointer transition-all ${
                selectedPlatform === "spotify"
                  ? "border-2 border-white/5 rounded-lg glow-green"
                  : "opacity-70"
              }`}
              onClick={() => handlePlatformSwitch("spotify")}
            >
              <img
                src="https://static.vecteezy.com/system/resources/previews/023/986/935/non_2x/spotify-logo-spotify-logo-transparent-spotify-icon-transparent-free-free-png.png"
                alt="Spotify"
                className="w-10 h-10"
              />
              <span className="text-xl font-normal tracking-wide text-white">
                Spotify
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Playlist Section */}
        <div className="w-full h-full overflow-y-auto max-h-[450px] pr-2 space-y-6 mt-4 scroll-smooth">
          {selectedPlatform === "spotify" && (
            <>
              <div>
                <h4 className="text-lg font-semibold mb-2">🎵 Lofi</h4>
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/playlist/28Po59vHO7fFRMS9lFoikq?utm_source=generator"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Chill Playlist"
                ></iframe>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">🌙 Relax</h4>
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/playlist/45whpHCCoqXkgpXNfn0gWk?utm_source=generator"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow=" autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Playlist"
                ></iframe>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">☕ Chill</h4>
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/playlist/7nYedBzOmpaBIHPCcQKGFx?utm_source=generator"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Relax Spotify Playlist"
                ></iframe>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">🎯 Focus</h4>
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/playlist/00JgiAeGZw6hDxm7RFbWCT?utm_source=generator"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Focus Playlist"
                ></iframe>
              </div>
            </>
          )}

          {selectedPlatform === "youtube" && (
            <>
              <div>
                <h4 className="text-lg font-semibold mb-2">🎵 Lofi</h4>
                <iframe
                  width="100%"
                  height="352"
                  style={{ borderRadius: "12px" }}
                  src="https://www.youtube-nocookie.com/embed/videoseries?si=ja1DfNtBEpqaUF2p&list=PLvP5VY9YvLvUE1FLTGrkqWZP3jNAOgR18"
                  title="Chill Playlist"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">🌙 Relax</h4>
                <iframe
                  width="100%"
                  height="352"
                  style={{ borderRadius: "12px" }}
                  src="https://www.youtube-nocookie.com/embed/videoseries?si=WSxRPHrI_lo4k0Aq&list=PLvP5VY9YvLvVHhFlo9Zxe6FvFa4539dJn"
                  title="Relax Playlist"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">☕ Chill</h4>
                <iframe
                  width="100%"
                  height="352"
                  style={{ borderRadius: "12px" }}
                  src="https://www.youtube-nocookie.com/embed/videoseries?si=SwTAGlbisDFcXn3F&list=PLvP5VY9YvLvUk_lPcgEg2_NsvIs0u3mlS"
                  title="Chill Playlist"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">🎯 Focus</h4>
                <iframe
                  width="100%"
                  height="352"
                  style={{ borderRadius: "12px" }}
                  src="https://www.youtube.com/embed/videoseries?si=aH1-NJi3gO4OzTbC&list=PLvP5VY9YvLvULN3o-wXar0O-4voyvRPGL"
                  title="Chill Playlist"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicButton;

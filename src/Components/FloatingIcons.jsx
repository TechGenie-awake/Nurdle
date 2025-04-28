import React from "react";
import MusicButton from "./MusicButton";
import SoundButton from "./SoundButton";

const FloatingIcons = () => {
  return (
    <div className="fixed bottom-4 right-4 flex gap-3 z-50">
      <SoundButton />
      <MusicButton />
    </div>
  );
};

export default FloatingIcons;

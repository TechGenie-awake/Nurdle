import React, { useState, useEffect } from "react";
import { MdOutlineReplay } from "react-icons/md";
import "./PomodoroTimer.css"; // Import the CSS file

const PomodoroTimer = ({ task, onDelete }) => {
  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(() => (task.focusTime || 25) * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const defaultDurations = {
      focus: (task?.focusTime || 25) * 60,
      short: (task?.shortBreak || 5) * 60,
      long: (task?.longBreak || 15) * 60,
    };

    setTimeLeft(defaultDurations[mode]);
  }, [mode, task]);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleReplay = () => {
    setIsRunning(false);
    setMode("focus"); // Reset to focus mode
    setTimeLeft((task.focusTime || 25) * 60); // Reset time to initial focus time
  };

  return (
    <div className="timer-card">
      <h2 className="timer-title">{task.name}</h2>

      <div className="flex justify-center space-x-2 mb-4">
        {[
          { key: "focus", label: "Focus" },
          { key: "short", label: "Short Break" },
          { key: "long", label: "Long Break" },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`mode-button ${mode === key ? "active" : ""}`}
            onClick={() => {
              setMode(key);
              setTimeLeft((task[key + "Break"] || 5) * 60);
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="timer-display">{formatTime(timeLeft)}</div>

      <div className="flex justify-center space-x-4">
        <button
          className={`start-pause-button ${
            isRunning ? "pause-button" : "start-button"
          }`}
          onClick={() => setIsRunning((prev) => !prev)}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button className="start-pause-button" onClick={handleReplay}>
          <MdOutlineReplay style={{ fontSize: "24px" }} />
        </button>
        <button className="start-pause-button pause-button" onClick={onDelete}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;

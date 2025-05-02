import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { RxLapTimer } from "react-icons/rx";
import { IoLogoDiscord } from "react-icons/io5";
import { LuNotebookText } from "react-icons/lu";
import { AiFillCalendar } from "react-icons/ai";
import { Link } from "react-router-dom";

import TimerSidebar from "./TimerSidebar";
import PomodoroTimer from "./PomodoroTimer";
import CommunitySidebar from "./CommunitySidebar";
import Community from "./Community";
import MemoSidebar from "./MemoSidebar";
import Memo from "./Memo";
import CalendarApp from "./CalendarApp"; // Import the new Calendar component

import "./FocusPage.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const FocusPage = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [user, loading, error] = useAuthState(auth);

  const handleSidebarClick = (section) => {
    if (section === "home" || activeSection === section) {
      setActiveSection("home");
      setSelectedTask(null);
      setSelectedMemo(null);
      setSelectedCommunity(null);
    } else {
      setActiveSection(section);
      setSelectedTask(null);
      setSelectedMemo(null);
      setSelectedCommunity(null);
    }
  };

  const isSidebarVisible = (section) => activeSection === section;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="focuspage-container">
      <div className="focuspage-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <Link
            to="/"
            className="sidebar-item"
            onClick={() => handleSidebarClick("home")}
          >
            <FaHome className="sidebar-icon" />
            <div className="sidebar-text">Home</div>
          </Link>

          <div
            className="sidebar-item"
            onClick={() => handleSidebarClick("timer")}
          >
            <RxLapTimer className="sidebar-icon" />
            <div className="sidebar-text">Timer</div>
          </div>

          <div
            className="sidebar-item"
            onClick={() => handleSidebarClick("memo")}
          >
            <LuNotebookText className="sidebar-icon" />
            <div className="sidebar-text">Memo</div>
          </div>

          <div
            className="sidebar-item"
            onClick={() => handleSidebarClick("calendar")}
          >
            <AiFillCalendar className="sidebar-icon" />
            <div className="sidebar-text">Calendar</div>
          </div>

          <div
            className="sidebar-item"
            onClick={() => handleSidebarClick("community")}
          >
            <IoLogoDiscord className="sidebar-icon" />
            <div className="sidebar-text">Community</div>
          </div>
        </aside>

        {/* Layout */}
        <div className="layout-flex">
          {/* Conditional Sidebars */}
          {isSidebarVisible("timer") && (
            <div className="timer-sidebar-wrapper">
              <TimerSidebar
                userId={user?.uid}
                setSelectedTask={setSelectedTask}
              />
            </div>
          )}

          {isSidebarVisible("memo") && (
            <div className="timer-sidebar-wrapper">
              <MemoSidebar setSelectedMemo={setSelectedMemo} user={user} />
            </div>
          )}

          {isSidebarVisible("community") && (
            <div className="timer-sidebar-wrapper">
              <CommunitySidebar onSelect={setSelectedCommunity} />
            </div>
          )}

          {/* Main Content Area */}
          <main className="main-content">
            {selectedTask ? (
              <PomodoroTimer
                task={selectedTask}
                onDelete={() => setSelectedTask(null)}
              />
            ) : (
              <>
                {activeSection === "home" && (
                  <div className="bg-white p-6 rounded-lg shadow-md text-gray-600">
                    <h2 className="text-2xl font-semibold mb-2">
                      Welcome to Focus Mode 🔥
                    </h2>
                    <p className="text-sm text-gray-500">
                      Choose a tool from the sidebar to get started.
                    </p>
                  </div>
                )}

                {activeSection === "timer" && (
                  <div className="bg-white p-6 rounded-lg shadow-md text-gray-600">
                    <h2 className="text-xl font-semibold mb-2">
                      Pomodoro Timer
                    </h2>
                    <p className="text-sm text-gray-500">
                      Select a task from the Timer sidebar to begin your
                      session.
                    </p>
                  </div>
                )}

                {activeSection === "community" && selectedCommunity ? (
                  <Community selectedCommunity={selectedCommunity} />
                ) : activeSection === "community" ? (
                  <div className="bg-white p-6 rounded-lg shadow-md text-gray-600">
                    <h2 className="text-2xl font-semibold mb-2">Community</h2>
                    <p className="text-sm text-gray-500">
                      Select a community from the sidebar to view it here.
                    </p>
                  </div>
                ) : null}

                {activeSection === "memo" && selectedMemo ? (
                  <div className="memo-card bg-white p-6 rounded-lg shadow-md text-gray-600">
                    <h2 className="text-xl font-semibold mb-2">Memo</h2>
                    <Memo
                      selectedMemo={selectedMemo}
                      setSelectedMemo={setSelectedMemo}
                      user={user}
                    />
                  </div>
                ) : activeSection === "memo" ? (
                  <div className="bg-white p-6 rounded-lg shadow-md text-gray-600">
                    <h2 className="text-xl font-semibold mb-2">Memo</h2>
                    <p className="text-sm text-gray-500">
                      Select a memo from the sidebar to view it here.
                    </p>
                  </div>
                ) : null}

                {activeSection === "calendar" && (
                  <div className="calendar-container">
                    <CalendarApp /> {/* Use the new Calendar component */}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Background Waves */}
      <div className="focuspage-waves-container">
        <div className="focuspage-wave"></div>
        <div className="focuspage-wave focuspage-wave2"></div>
        <div className="focuspage-wave focuspage-wave3"></div>
      </div>
    </div>
  );
};

export default FocusPage;

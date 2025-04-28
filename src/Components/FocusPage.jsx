import React, { useState } from "react";
import { FaHome, FaTasks, FaUser, FaCog } from "react-icons/fa";
import { RxLapTimer } from "react-icons/rx";
import { IoLogoDiscord } from "react-icons/io5";
import { LuNotebookText } from "react-icons/lu";
import { Link } from "react-router-dom";
import TimerSidebar from "./TimerSidebar";
import PomodoroTimer from "./PomodoroTimer";
import CommunitySidebar from "./CommunitySidebar";
import Community from "./Community";
import MemoSidebar from "./MemoSidebar";
import Memo from "./Memo"; // Import the Memo component
import "./FocusPage.css";

const FocusPage = () => {
  const [activeSection, setActiveSection] = useState("home"); // which icon is selected
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedMemo, setSelectedMemo] = useState(null); // State for selected memo
  const [selectedCommunity, setSelectedCommunity] = useState(null); // State for selected community

  const handleSidebarClick = (section) => {
    if (section === "home") {
      setActiveSection("home");
      setSelectedTask(null);
      setSelectedMemo(null); // Clear selected memo when going to home
      setSelectedCommunity(null); // Clear selected community when going to home
      return;
    }

    if (activeSection === section) {
      // toggle off if same icon is clicked
      setActiveSection("home");
      setSelectedTask(null);
      setSelectedMemo(null); // Clear selected memo when toggling off
      setSelectedCommunity(null); // Clear selected community when toggling off
    } else {
      setActiveSection(section);
      setSelectedTask(null);
      setSelectedMemo(null); // Clear selected memo when switching sections
      setSelectedCommunity(null); // Clear selected community when switching sections
    }
  };

  const isSidebarVisible = (section) => activeSection === section;

  return (
    <div className="focuspage-container">
      <div className="focuspage-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <Link
            to="/"
            className="sidebar-item"
            onClick={() => {
              setActiveSection("home");
              setSelectedTask(null);
              setSelectedMemo(null); // Clear selected memo when going to home
              setSelectedCommunity(null); // Clear selected community when going to home
            }}
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
            onClick={() => handleSidebarClick("tasks")}
          >
            <FaTasks className="sidebar-icon" />
            <div className="sidebar-text">Tasks</div>
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
            onClick={() => handleSidebarClick("community")}
          >
            <IoLogoDiscord className="sidebar-icon" />
            <div className="sidebar-text">Community</div>
          </div>

          <div
            className="sidebar-item"
            onClick={() => handleSidebarClick("settings")}
          >
            <FaCog className="sidebar-icon" />
            <div className="sidebar-text">Settings</div>
          </div>
        </aside>

        {/* Layout */}
        <div className="layout-flex">
          {/* Conditional Sidebars */}
          {isSidebarVisible("timer") && (
            <div className="timer-sidebar-wrapper">
              <TimerSidebar setSelectedTask={setSelectedTask} />
            </div>
          )}

          {isSidebarVisible("tasks") && (
            <div className="timer-sidebar-wrapper">
              <div className="p-4 w-full h-full bg-white shadow-md">
                <h2 className="text-lg font-bold text-gray-700 mb-4">
                  Your Tasks
                </h2>
                <p className="text-sm text-gray-500">
                  Tasks Sidebar coming soon...
                </p>
              </div>
            </div>
          )}

          {isSidebarVisible("memo") && (
            <div className="timer-sidebar-wrapper">
              <MemoSidebar setSelectedMemo={setSelectedMemo} />
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

                {activeSection === "tasks" && (
                  <div className="bg-white p-6 rounded-lg shadow-md text-gray-600">
                    <h2 className="text-xl font-semibold mb-2">Tasks</h2>
                    <p className="text-sm text-gray-500">
                      Tasks list placeholder – Add, edit, and manage tasks
                      coming soon.
                    </p>
                  </div>
                )}

                {activeSection === "community" && (
                  <>
                    {selectedCommunity ? (
                      <Community selectedCommunity={selectedCommunity} />
                    ) : (
                      <div className="bg-white p-6 rounded-lg shadow-md text-gray-600">
                        <h2 className="text-2xl font-semibold mb-2">
                          Community
                        </h2>
                        <p className="text-sm text-gray-500">
                          Select a community from the sidebar to view it here.
                        </p>
                      </div>
                    )}
                  </>
                )}

                {activeSection === "settings" && (
                  <div className="bg-white p-6 rounded-lg shadow-md text-gray-600">
                    <h2 className="text-xl font-semibold mb-2">Settings</h2>
                    <p className="text-sm text-gray-500">
                      Customize your preferences here.
                    </p>
                  </div>
                )}

                {activeSection === "memo" && selectedMemo && (
                  <div className="memo-card">
                    <h2 className="text-xl font-semibold mb-2">Memo</h2>
                    <Memo
                      selectedMemo={selectedMemo}
                      setSelectedMemo={setSelectedMemo}
                    />
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

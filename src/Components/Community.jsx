import React, { useState, useEffect } from "react";

const Community = ({ selectedCommunity }) => {
  const communityData = {
    discord: {
      url: "https://discord.com/widget?id=1366069579314364577&theme=dark",
      width: "350",
      height: "400",
      allowTransparency: "true",
      frameBorder: "0",
      sandbox:
        "allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts",
    },
    coffitivity: {
      url: "https://coffitivity.com/",
      width: "100%",
      height: "100%",
    },
    studyTogether: {
      platformUrl: "https://www.studytogether.com/",
      discordUrl: "https://discord.gg/study", // official study together discord invite
    },
  };

  const selectedData = communityData[selectedCommunity];
  const [showStudyModal, setShowStudyModal] = useState(false);

  useEffect(() => {
    if (selectedCommunity === "studyTogether") {
      setShowStudyModal(true);
    }
  }, [selectedCommunity]);

  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };

  if (
    !selectedData ||
    (selectedCommunity === "studyTogether" && !showStudyModal)
  ) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-gray-600">
        <h2 className="text-2xl font-semibold mb-2">Community</h2>
        <p className="text-sm text-gray-500">Community not found.</p>
      </div>
    );
  }

  if (selectedCommunity === "studyTogether" && showStudyModal) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Study Together Community
        </h2>
        <div className="flex w-[600px] h-[600px]">
          {/* Study Together App */}
          <div
            onClick={() =>
              openInNewTab(communityData.studyTogether.platformUrl)
            }
            className="bg-white/30 cursor-pointer p-6 rounded-2xl shadow-lg transition"
            style={{
              border: "5px solid #f16d6d",
              color: "#9b598a",
            }}
          >
            <h3 className="text-lg font-semibold" style={{ color: "#be6d96" }}>
              📚 Study Together Platform
            </h3>
            <p className="text-xl text-gray-800">
              Join a global community of passionate learners dedicated to
              helping each other stay focused, beat procrastination, and achieve
              academic success. Whether you're preparing for exams, tackling
              assignments, or working on personal projects, the Study Together
              platform offers a supportive environment to share tips,
              collaborate on study sessions, and hold each other accountable.
              Let's grow and succeed together, one study session at a time!
            </p>
            <div
              onClick={() =>
                openInNewTab(communityData.studyTogether.discordUrl)
              }
              className="cursor-pointer p-6 rounded-2xl shadow-lg transition"
              style={{
                backgroundColor: "#f1dee6",
                border: "5px solid #bf5873",
                color: "#9b598a",
              }}
            >
              <h3
                className="text-lg font-semibold"
                style={{ color: "#be6d96" }}
              >
                🎉 Study Together Discord
              </h3>
              <p className="text-sm" style={{ color: "#d487a1" }}>
                Join Study Together's official Discord community!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      <iframe
        src={selectedData.url}
        title="Community"
        width={selectedData.width || "100%"}
        height={selectedData.height || "100%"}
        style={{ border: "none", borderRadius: "8px" }}
        allowTransparency={selectedData.allowTransparency}
        frameBorder={selectedData.frameBorder || "0"}
        sandbox={selectedData.sandbox}
      ></iframe>
    </div>
  );
};

export default Community;

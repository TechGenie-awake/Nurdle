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
        {/* <h2 className="text-3xl font-bold mb-4 text-gray-900">
          Study Together Community
        </h2> */}
        <div className="flex w-[600px] h-[600px]">
          {/* Study Together App */}
          <div
            className="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg transition"
            style={{
              border: "5px solid rgba(245, 95, 39, 0.6)",
              color: "#333",
            }}
          >
            <div
              className="w-[60%] h-20 my-4 mx-auto"
              style={{
                backgroundImage:
                  "url('https://cdn.prod.website-files.com/60890f6ac44206aef9237eb4/60af5d803ae591d12f0e43b3_studytogehter-logo-colour2.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            <p className="text-lg text-gray-900 p-4">
              Join a global community of passionate learners dedicated to
              helping each other stay focused, beat procrastination, and achieve
              academic success. Whether you're preparing for exams, tackling
              assignments, or working on personal projects, the Study Together
              platform offers a supportive environment to share tips,
              collaborate on study sessions, and hold each other accountable.
              Let's grow and succeed together, one study session at a time!
            </p>
            <div className="w-auto">
              <button
                onClick={() =>
                  openInNewTab(communityData.studyTogether.platformUrl)
                }
                className="w-[20vw] h-[10vh] m-7 border border-gray-300 text-gray-900 font-semibold py-2 px-4 rounded-lg shadow-md transition hover:bg-gray-200"
                style={{
                  backgroundImage:
                    "url('https://www.ladn.eu/wp-content/uploads/2021/10/Studystream-1.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "white", // Ensure text is visible
                }}
              >
                <div className="bg-black/30 rounded-lg">
                  <span
                    className="relative z-10" // Ensure text is above the overlay
                    style={{
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)", // Text shadow for visibility
                    }}
                  >
                    Go to App
                  </span>
                </div>
              </button>
              <br />
              <button
                onClick={() =>
                  openInNewTab(communityData.studyTogether.discordUrl)
                }
                className="w-[20vw] h-[10vh] border border-gray-300 text-gray-900 font-semibold py-2 px-4 rounded-lg shadow-md transition hover:bg-gray-200"
                style={{
                  backgroundImage:
                    "url('https://cdn.prod.website-files.com/5f9072399b2640f14d6a2bf4/64ee1e326f98eba675aa4fc1_image7.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "white", // Ensure text is visible
                }}
              >
                <div className="bg-white/20 rounded-lg">
                  <span
                    className="relative z-10" // Ensure text is above the overlay
                    style={{
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)", // Text shadow for visibility
                    }}
                  >
                    Join Discord
                  </span>
                </div>
              </button>
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

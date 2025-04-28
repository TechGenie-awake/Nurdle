import React from "react";

// Sidebar component which will pass the selected community up
const CommunitySidebar = ({ onSelect }) => {
  return (
    <div className="p-4 w-full h-full bg-white shadow-md">
      <h2 className="text-lg font-bold text-gray-700 mb-6">Communities</h2>
      <div className="flex flex-col gap-4">
        {/* Discord Option */}
        <div
          onClick={() => onSelect("discord")}
          className="cursor-pointer bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition"
        >
          <div className="flex items-center gap-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111370.png"
              alt="Discord"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h3 className="font-semibold text-gray-800">Join Our Discord</h3>
              <p className="text-gray-500 text-sm">
                Connect and collaborate with us!
              </p>
            </div>
          </div>
        </div>

        {/* Coffitivity Option */}
        <div
          onClick={() => onSelect("coffitivity")}
          className="cursor-pointer bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition"
        >
          <div className="flex items-center gap-4">
            <img
              src="https://images.dwncdn.net/images/t_app-icon-l/p/a2f91fce-9b2e-11e6-ba55-00163ed833e7/3910414363/2094_4-75956396-logo"
              alt="Coffitivity"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h3 className="font-semibold text-gray-800">
                Coffitivity Sounds
              </h3>
              <p className="text-gray-500 text-sm">
                Boost focus with cozy cafe sounds.
              </p>
            </div>
          </div>
        </div>

        {/* Study Together Option */}
        <div
          onClick={() => onSelect("studyTogether")}
          className="cursor-pointer bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition"
        >
          <div className="flex items-center gap-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqnjIt-9eJQYoxju3KHgG1PJGuHwFMtkDcGw&s"
              alt="Study Together"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h3 className="font-semibold text-gray-800">Study Together</h3>
              <p className="text-gray-500 text-sm">
                Study with others around the world live.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySidebar;

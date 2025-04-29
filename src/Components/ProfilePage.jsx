import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) {
        navigate("/login");
        return;
      }

      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          console.log("Fetched user data:", data);
          setUserData(data);
        } else {
          console.log("No user document found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out: ", error.message);
    }
  };

  const handleBackToHome = () => {
    navigate("/"); // Navigate to the home page
  };

  if (!userData) return <div className="text-gray-500 p-10">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Profile
        </h1>
        <div className="space-y-4">
          <div className="flex justify-between">
            <strong className="text-gray-600">Username:</strong>
            <span className="text-gray-800">{userData.username || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <strong className="text-gray-600">Email:</strong>
            <span className="text-gray-800">{userData.email || "N/A"}</span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <button
            onClick={handleBackToHome}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-full text-xl hover:bg-blue-700 transition duration-200"
          >
            Back to Home
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white px-6 py-3 rounded-full text-xl hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

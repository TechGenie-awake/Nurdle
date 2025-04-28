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
          console.log("Fetched user data:", data); // ✅ Log here
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

  if (!userData) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="text-red-500 p-10">
      <h1 className="text-3xl mb-4">Profile</h1>
      <div className="space-y-4">
        <div>
          <strong>Username: </strong>
          <span>{userData ? userData.username || "N/A" : "N/A"}</span>
        </div>
        <div>
          <strong>Email: </strong>
          <span>{userData ? userData.email || "N/A" : "N/A"}</span>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 text-white px-6 py-3 rounded-full text-xl hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;

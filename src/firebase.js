/* eslint-disable no-unused-vars */
// Import necessary Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Add Firebase Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxuMTqJR6L5R4uSmdGZwEn6nIau-BSNaQ",
  authDomain: "nurdle-22251.firebaseapp.com",
  projectId: "nurdle-22251",
  storageBucket: "nurdle-22251.firebasestorage.app",
  messagingSenderId: "964218136621",
  appId: "1:964218136621:web:9ee62d1ef12c348b43f0a4",
  measurementId: "G-RTTD669R1R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app); // Export auth for use in your app

// Initialize Analytics
const analytics = getAnalytics(app);

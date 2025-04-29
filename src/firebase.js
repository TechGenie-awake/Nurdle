// Import necessary Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Firebase Authentication
// If you need Analytics, you can keep this line; otherwise, remove it.
// import { getAnalytics } from "firebase/analytics";

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

// Uncomment if you're using Analytics
// const analytics = getAnalytics(app);
// Export analytics if needed
// export { analytics };

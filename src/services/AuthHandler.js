import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase"; // Import from your firebase.js file
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth"; // Modular imports for Firebase v9

const AuthHandler = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (user) {
    return (
      <div>
        <h1>Welcome {user.displayName}</h1>
        <p>Email: {user.email}</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Not authenticated</h1>
        <button
          onClick={
            () => signInWithRedirect(auth, new GoogleAuthProvider()) // Use the correct method for sign-in with redirect
          }
        >
          Sign in with Google
        </button>
      </div>
    );
  }
};

export default AuthHandler;

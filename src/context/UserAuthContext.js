import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase_config";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      console.log(currentuser);
      // if (currentuser) {
      //   // location.pathname.includes("invite") || location.pathname.includes("work") || location.pathname.includes("quiz")
      //   // if (true) {
      //   //   return;
      //   // } else {
      //   //   navigate("/class");
      //   // }
      // } else {
      //   navigate("/");
      // }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider value={{ user, logOut, googleSignIn }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}

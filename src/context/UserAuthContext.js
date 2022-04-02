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
  window.addEventListener("unload", function (e) {
    logOut()
  });
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    if (!user) return;
    // console.log(user.uid)

    return () => {
      // unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      if (!currentuser) {
        navigate("/auth");
      }
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

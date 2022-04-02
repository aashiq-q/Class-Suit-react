import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase_config";
import { doc, setDoc, onSnapshot, collection, query, where } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
import { db } from "../firebase_config";

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
    if (!user) return;
    console.log(user.uid)

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
  useEffect(() => {
    if (!user) {
      return;
    }
    const messaging = getMessaging();
    getToken(messaging, {
      vapidKey:
        "BEQ4vQoQYnhObhXImiKvJuhYD50t4fKOtuWnr-OMa0b7pvfIaQyRjwLKRcUBGhqOaVbBaxNO3ZV7obp2IT1hjwA",
    })
      .then(async (currentToken) => {
        if (currentToken && user) {
          console.log(currentToken);
          await setDoc(doc(db, "FCM", user.uid), { FCM_TOKEN: currentToken });
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err.message);
      });
  }, [user]);
  return (
    <userAuthContext.Provider value={{ user, logOut, googleSignIn }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}

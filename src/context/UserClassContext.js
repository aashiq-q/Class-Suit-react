import React, { useState, createContext, useContext, useEffect } from "react";
import { db } from "../firebase_config";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { useUserAuth } from "./UserAuthContext";
import useDrivePicker from "react-google-drive-picker";

const userClassContext = createContext();

export function UserClassContextProvider({ children }) {
  const { user } = useUserAuth();
  const [classes, setClasses] = useState([]);
  const q = query(
    collection(db, "classes"),
    where("members", "array-contains", `${user && user.email}`)
  );
  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let arr = [];
        querySnapshot.forEach((doc) => {
          let doc_data = {
            id: doc.id,
            data: doc.data(),
          };
          arr.push(doc_data);
        });
        arr = arr.reverse();
        setClasses(arr);
      });
      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  const [isAdmin, setIsAdmin] = useState(false);

  const [openPicker, data] = useDrivePicker();

  const [fileData, setFileData] = useState([]);
  const handleOpenPicker = () => {
    openPicker({
      clientId:
        "9795694558-3mhtthqopjqa000ql2to27i07ohdmqua.apps.googleusercontent.com",
      developerKey: "AIzaSyAHGFdPN9zrZs0rbX5M73nEyxExcd_SPGU",
      viewId: "",
      token:
        "ya29.A0ARrdaM_oM_g3MYF4ynywMyUqZ-ZWyEPZQToo3TGh9nrzCju4CPKfpCPGOGW4lXB4MzgDfic68O37M_Rsk-srIIX4yeV3d1VGYkuZfFj0QqYu3CPR0rUqR3DgbzQ4xcL1paJ8KIoNYxziDQbwVQKqGc2RQkRH",
      showUploadView: true,
      showUploadFolders: false,
      supportDrives: true,
      multiselect: true,
      disableDefaultView: true,
    });
  };

  useEffect(() => {
    if (data) {
      setFileData(data.docs);
    }
  }, [data]);

  const getCurrentDate = () => {
    const date_obj = new Date();
    const date = date_obj.getDate();
    const month = date_obj.getMonth() + 1;
    const year = date_obj.getFullYear();
    const date_string = `${date}-${month}-${year}`;
    return date_string;
  };

  const setLocationId = (id) => {
    let finalClass = {};
    for (let i = 0; i < classes.length; i++) {
      if (classes[i].id === id) {
        finalClass = classes[i];
      }
    }
    return finalClass;
  };

  const create_class = async (name) => {
    await addDoc(collection(db, "classes"), {
      announcementPermssionBoolean: false,
      class_name: name,
      creator: user.displayName,
      creatorEmail: user.email,
      creatorPhoto: user.photoURL,
      time: serverTimestamp(),
      members: [user.email],
    });
  };

  const join_class_with_code = async (doc_id, email) => {
    console.log(doc_id);
    const docRef = doc(db, "classes", doc_id);

    await updateDoc(docRef, {
      members: arrayUnion(email),
    });
  };

  return (
    <userClassContext.Provider
      value={{
        classes,
        setLocationId,
        getCurrentDate,
        create_class,
        join_class_with_code,
        setIsAdmin,
        isAdmin,
        handleOpenPicker,
        fileData,
      }}
    >
      {children}
    </userClassContext.Provider>
  );
}

export function useUserClass() {
  return useContext(userClassContext);
}

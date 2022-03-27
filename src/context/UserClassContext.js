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
  orderBy
} from "firebase/firestore";
import { useUserAuth } from "./UserAuthContext";

const userClassContext = createContext();


export function UserClassContextProvider({ children }) {
  const [ currentClass, setCurrentClass ] = useState("")
  
  const { user } = useUserAuth();
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    const q = query(
      collection(db, "classes"),
      where("members", "array-contains", `${user && user.email}`)
    );
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
    setCurrentClass(id)
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
        currentClass
      }}
    >
      {children}
    </userClassContext.Provider>
  );
}

export function useUserClass() {
  return useContext(userClassContext);
}

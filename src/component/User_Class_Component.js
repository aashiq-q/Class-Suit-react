import React, { useEffect, useState } from "react";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase_config";
import { useParams } from "react-router-dom";

const User_Class_Component = ({ user, userEmail }) => {
  const { id } = useParams();
  const docRef = doc(db, "classes", id);
  const handleClick = async () => {
    await updateDoc(docRef, {
      members: arrayRemove(user),
    });
  };
  const [isSame, setIsSame] = useState(false);
  useEffect(() => {
    if (user === userEmail) {
      setIsSame(true);
    }
  }, [user]);
  return (
    <div className="p-2 rounded-md border-2 flex justify-between items-center mb-2">
      <div className="p-2 overflow-hidden text-ellipsis whitespace-nowrap">{user}</div>
      <i
        className={!isSame ? "bi bi-trash3-fill cursor-pointer mr-2" : "hidden"}
        onClick={handleClick}
      ></i>
    </div>
  );
};

export default User_Class_Component;

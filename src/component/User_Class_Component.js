import React from "react";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase_config";
import { useParams } from "react-router-dom";

const User_Class_Component = ({user}) => {
	const { id } = useParams()
	const docRef = doc(db, "classes", id);
	const handleClick = async () => {
		await updateDoc(docRef, {
			members: arrayRemove(user)
		});
	}
  return (
    <div className="p-2 rounded-md border-2 flex justify-between items-center mb-2">
      <div className="p-2">{user}</div>
      <i className="bi bi-trash3-fill cursor-pointer mr-2" onClick={handleClick}></i>
    </div>
  );
};

export default User_Class_Component;

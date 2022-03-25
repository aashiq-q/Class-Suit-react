import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase_config";
import Accordian from "../component/Accordian";

const Submissions = () => {
  const { parentID, workID } = useParams();
  const [submission, setSubmission] = useState([]);
  useEffect(() => {
    const docRef = collection(
      db,
      "classes",
      `${parentID}`,
      "work",
      `${workID}`,
      "submissions"
    );
    const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      if (arr.length !== 0) {
        setSubmission(arr);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      {submission &&
        submission.map((submissionData) => {
          return (
			  <Accordian/>
		  )
        })}
    </div>
  );
};

export default Submissions;

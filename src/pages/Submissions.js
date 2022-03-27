import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase_config";
import Accordian from "../component/Accordian";

const Submissions = () => {
  document.title = "Class-Suit | Submission"
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
    <h1 className="text-2xl text-center underline-offset-2 underline font-bold my-5">Submissions</h1>

      {submission &&
        submission.map((submissionData) => {
          return (
            <Accordian key={submissionData.timestamp} data={submissionData}/>
		  )
        })}
    </div>
  );
};

export default Submissions;

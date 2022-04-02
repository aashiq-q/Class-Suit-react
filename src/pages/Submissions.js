import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase_config";
import Accordian from "../component/Accordian";

const Submissions = () => {
  document.title = "Class-Suit | Submission";
  const { parentID, workID } = useParams();
  const [submission, setSubmission] = useState([]);
  const [title, settitle] = useState(
    window.localStorage.getItem("currentassignmenttitle")
  );
  const [due, setdue] = useState(
    window.localStorage.getItem("currentassignmentduedate")
  );
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
      <h1 className="text-2xl text-center underline-offset-2 underline font-bold my-5">
        Submissions
      </h1>
      <div className="flex flex-col px-6 lg:px-48">
        <p className="font-bold mt-1 text-black text-base">
          Assignment Name: {title}
        </p>
        <p className="font-semibold mt-1 text-slate-400 text-base">
          Due: {due}
        </p>
      </div>
      {submission &&
        submission.map((submissionData) => {
          return (
            <Accordian key={submissionData.timestamp} data={submissionData} />
          );
        })}
    </div>
  );
};

export default Submissions;

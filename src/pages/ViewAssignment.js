import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FileNameDisplay from "../component/FileNameDisplay";
import LoadingScreen from "../component/LoadingScreen";
import {
  setDoc,
  onSnapshot,
  doc,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase_config";
import ProgressBar from "../component/ProgressBar";
import { useUserAuth } from "../context/UserAuthContext";
import { useUserClass } from "../context/UserClassContext";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const ViewAssignment = () => {
  const storage = getStorage();
  const { parentID, workID } = useParams();
  const [isLoading, setisLoading] = useState(true);

  const [inputfiles, setInputFiles] = useState();
  const [submittedData, setSubmittedData] = useState();

  const { user } = useUserAuth();
  const { getCurrentDate } = useUserClass();

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 4000);
  }, []);

  const [data, setData] = useState();
  const [submitString, setSubmitString] = useState("Submit");

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "classes", `${parentID}`, "work", `${workID}`),
      (doc) => {
        const docData = {
          id: doc.id,
          docData: doc.data(),
        };
        setData(docData);
      }
    );

    return () => {
      unsub();
    };
  }, []);
  useEffect(() => {
    const unsub1 = onSnapshot(
      doc(
        db,
        "classes",
        `${parentID}`,
        "work",
        `${workID}`,
        `submissions`,
        `${user.email}`
      ),
      (doc) => {
        const docData = {
          id: doc.id,
          docData: doc.data(),
        };
        console.log(docData)
        setSubmittedData(docData);
        if (docData.docData !== undefined) {
          setSubmitString("Already Submitted")
        }
      }
    );
    return () => {
      unsub1();
    };
  }, []);

  const handleFileChange = (e) => {
    let files = e.target.files;
    let arr = [];
    for (let i = 0; i < files.length; i++) {
      arr.push(files[i]);
    }
    setInputFiles(arr);
    console.log(arr.length);
  };
  useEffect(() => {
    console.log(inputfiles);
  }, [inputfiles]);

  const handleUpload = async () => {
    setSubmitString("Uploading...");
    await setDoc(
      doc(
        db,
        "classes",
        `${parentID}`,
        "work",
        `${workID}`,
        "submissions",
        `${user.email}`
      ),
      {
        date: getCurrentDate(),
        email: user.email,
        timestamp: serverTimestamp(),
        user: user.displayName,
      }
    ).then(async () => {
      inputfiles.forEach((inputFile) => {
        const fileName = inputFile.name;
        const path = `${parentID}/${workID}/Submissions/${user.email}}/${fileName}`;
        const storageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(storageRef, inputFile);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setprogressPercentage(progress);
            if (progress === 100) {
              setprogressPercentage(0);
              setSubmitString("Submitted");
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                const documentRef = doc(
                  db,
                  "classes",
                  `${parentID}`,
                  "work",
                  `${workID}`,
                  "submissions",
                  `${user.email}`
                );
                await updateDoc(documentRef, {
                  regions: arrayUnion({
                    filename: fileName,
                    url: downloadURL,
                    path: path,
                  }),
                })
                  .then(() => {
                    console.log("first");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            );
          }
        );
      });
    });
  };

  const [progressPercentage, setprogressPercentage] = useState(0);
  return (
    <>
      {isLoading ? <LoadingScreen /> : null}
      <div className="flex flex-col w-3/4 m-auto mt-5">
        <p className="font-bold text-3xl">{data && data.docData.title}</p>
        <p className="font-semibold mt-3 text-slate-400 text-base">
          {data && data.docData.description}
        </p>
        <div className="flex flex-wrap">
          {data &&
            data.docData.regions.map((fileContent) => {
              return (
                <FileNameDisplay
                  key={fileContent.url}
                  file={{ name: fileContent.filename, url: fileContent.url }}
                />
              );
            })}
        </div>
        <hr className="my-4 bg-slate-700" />
        <div className="relative py-0 flex-auto">
          <label
            htmlFor="filesWork"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Upload the files :
          </label>
          <input
            id="filesWork"
            type="file"
            multiple
            className="rounded-md w-full mb-4"
            autoComplete="off"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex flex-wrap">
          {inputfiles &&
              inputfiles.map((file) => {
                return (
                  <FileNameDisplay
                    key={file.lastModifiedDate}
                    file={{ name: file.name }}
                  />
                );
              })}
             {/* {submittedData &&
              submittedData.docData.regions.map((files) => {
                console.log(submittedData.docData)
                console.log(files);
                return (
                  <FileNameDisplay
                    key={files.url}
                    file={{ name: files.filename, url: files.url }}
                  />
                );
              })} */}
        </div>
        {progressPercentage === 0 ? (
          ""
        ) : (
          <ProgressBar progressPercentage={progressPercentage} />
        )}
        <button
          className="bg-blue-500 w-max text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mx-2 mt-4"
          type="button"
          onClick={handleUpload}
        >
          {submitString}
        </button>
      </div>
    </>
  );
};

export default ViewAssignment;

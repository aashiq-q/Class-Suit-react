import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Alert from "../component/Alert";
import FileNameDisplay from "../component/FileNameDisplay";
import ProgressBar from "../component/ProgressBar";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  arrayUnion
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { db } from "../firebase_config";
import { useUserClass } from "../context/UserClassContext";
import { useUserAuth } from "../context/UserAuthContext";

const CreateWork = () => {
  const navigate = useNavigate();
  const storage = getStorage();
  const { parentID } = useParams();
  const { user } = useUserAuth();
  const { getCurrentDate } = useUserClass();

  const [flag, setflag] = useState(false);
  const [message, setMessage] = useState("");

  const [InputFiles, setInputFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFileInputChange = (e) => {
    let arr = [];
    for (let i = 0; i < e.target.files.length; i++) {
      arr.push(e.target.files[i]);
    }
    setInputFiles(arr);
  };

  const postAssignment = async () => {
    if (title.length < 5 || description.length < 5) {
      call_alert(
        "Length of title and description should be of atleast 5 characters"
      );
    } else {
      await addDoc(collection(db, "classes", `${parentID}`, "work"), {
        title: title,
        description: description,
        date: getCurrentDate(),
        email: user.email,
        timestamp: serverTimestamp(),
        type: "assignment",
        user: user.displayName,
      })
        .then(async (docRef) => {
          const dataId = docRef.id;
          console.log("done");
          if (InputFiles.length === 0) {
            return;
          } else {
            console.log();
            InputFiles.forEach((inputFile) => {
              console.log(inputFile);
              const fileName = inputFile.name;
              const path = `${parentID}/${docRef.id}/${fileName}`;
              const storageRef = ref(storage, path);
              const uploadTask = uploadBytesResumable(storageRef, inputFile);
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  setprogressPercentage(progress);
                  if (progress === 100) {
                    call_alert("Assignment Posted Successfully!!");
                    setprogressPercentage(0);
                  }
                },
                (error) => {
                  console.log(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                      const documentRef = doc(
                        db,
                        "classes",
                        `${parentID}`,
                        "work",
                        `${dataId}`
                      );
                      await updateDoc(documentRef, {
                        regions: arrayUnion( {
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
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const call_alert = (content) => {
    setflag(true);
    setMessage(content);
    const timeout = setTimeout(() => {
      setflag(false);
      clearTimeout(timeout);
    }, 10);
  };

  const [progressPercentage, setprogressPercentage] = useState(0);

  return (
    <>
      <Alert message={message} flag={flag} messageSetter={setMessage} />
      <div className="relative p-6 pb-0 flex-auto">
        <label
          htmlFor="workTitle"
          className="block text-base font-medium text-gray-700 mb-2"
        >
          Title:
        </label>
        <input
          id="workTitle"
          className="rounded-md w-full mb-4"
          placeholder="Title"
          autoComplete="off"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="relative p-6 py-0 flex-auto">
        <label
          htmlFor="workDescription"
          className="block text-base font-medium text-gray-700 mb-2"
        >
          Description:
        </label>
        <input
          id="workDescription"
          className="rounded-md w-full mb-4"
          placeholder="Description"
          autoComplete="off"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="relative p-6 py-0 flex-auto">
        <label
          htmlFor="files"
          className="block text-base font-medium text-gray-700 mb-2"
        >
          Files :
        </label>
        <input
          id="files"
          type="file"
          multiple
          onChange={handleFileInputChange}
          className="rounded-md w-full mb-4"
          autoComplete="off"
        />
      </div>

      <div className="px-4 flex flex-wrap">
        {InputFiles &&
          InputFiles.map((fileData) => {
            return (
              <FileNameDisplay key={fileData.lastModified} file={fileData} />
            );
          })}
        {progressPercentage === 0 ? (
          ""
        ) : (
          <ProgressBar progressPercentage={progressPercentage} />
        )}
      </div>
      <div className="flex px-4 mt-4">
        <button
          className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mx-2"
          type="button"
          onClick={postAssignment}
        >
          Post Assignment
        </button>
      </div>
    </>
  );
};

export default CreateWork;

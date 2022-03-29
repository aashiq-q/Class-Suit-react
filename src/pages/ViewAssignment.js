import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import Alert from "../component/Alert";
import { FiExternalLink } from "react-icons/fi";

const ViewAssignment = () => {
  const navigate = useNavigate();
  const storage = getStorage();
  const { parentID, workID } = useParams();
  const [isLoading, setisLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [flag, setflag] = useState(false);

  const [inputfiles, setInputFiles] = useState();
  const [submittedData, setSubmittedData] = useState(null);

  const { user } = useUserAuth();
  const { getCurrentDate, isAdmin, setIsAdmin, setLocationId } = useUserClass();
  const [current_class, setCurrent_class] = useState(setLocationId(parentID));
  useEffect(() => {
    setCurrent_class(setLocationId(parentID));
    if (current_class && current_class.data.creatorEmail === user.email) {
      setIsAdmin(true);
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 4000);
  }, []);

  const call_alert = (content) => {
    setflag(true);
    setMessage(content);
    const timeout = setTimeout(() => {
      setflag(false);
      clearTimeout(timeout);
    }, 10);
  };

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
    if (user) {
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

          if (docData.docData !== undefined && docData.docData.dataUploaded) {
            setSubmittedData(docData);
            setSubmitString("Already Submitted");
            call_alert(
              `Hey!! ${user.displayName}, You Have Already Submitted the assignment`
            );
          } else {
            setSubmittedData(null);
          }
        }
      );
      return () => {
        unsub1();
      };
    }
  }, [user]);

  const handleFileChange = (e) => {
    let files = e.target.files;
    let arr = [];
    for (let i = 0; i < files.length; i++) {
      arr.push(files[i]);
    }
    setInputFiles(arr);
  };

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
        dataUploaded: false,
      }
    ).then(async () => {
      inputfiles.forEach((inputFile) => {
        const fileName = inputFile.name;
        const path = `${parentID}/${workID}/Submissions/${user.email}/${fileName}`;
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
                await setDoc(
                  documentRef,
                  {
                    regions: arrayUnion({
                      filename: fileName,
                      url: downloadURL,
                      path: path,
                    }),
                    dataUploaded: true,
                  },
                  { merge: true }
                )
                  .then(() => {
                    call_alert("Assignment Submitted Successfully!");
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
  const searchURL = () => {
    if (data && data.docData.title.length === 0) {
      return;
    }
    const title = data && data.docData.title;
    if (title) {
      const query = title.split(" ");
      setfinalQueryText(query.join("+"));
    }
  };
  useEffect(() => {
    searchURL();
  }, []);

  const [finalQueryText, setfinalQueryText] = useState("");
  return (
    <>
      <Alert messageSetter={setMessage} message={message} flag={flag} />
      {isLoading ? <LoadingScreen /> : null}
      <div className="flex flex-col w-3/4 m-auto mt-5">
        <div className="flex justify-center flex-col items-start font-bold text-3xl md:flex-row md:justify-between md:items-center">
          <p className="flex items-center font-bold text-3xl">
            {data && data.docData.title}
            <a href={`https://www.google.com/search?q=${finalQueryText}`} className="text-blue-600" target="_blank">
              <FiExternalLink className="ml-4 cursor-pointer text-base" />
            </a>
          </p>
          <a
            className={
              isAdmin
                ? "cursor-pointer bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mx-2"
                : "hidden"
            }
            onClick={() => {
              navigate(`/submissions/${parentID}/${workID}`);
            }}
          >
            Submissions
          </a>
        </div>
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
        <div className="relative py-0 flex-auto mx-2">
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
          {!submittedData &&
            inputfiles &&
            inputfiles.map((file) => {
              return (
                <FileNameDisplay key={file.name} file={{ name: file.name }} />
              );
            })}
          {submittedData &&
            submittedData.docData.regions.map((files) => {
              return (
                <FileNameDisplay
                  key={files.url}
                  file={{ name: files.filename, url: files.url }}
                />
              );
            })}
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

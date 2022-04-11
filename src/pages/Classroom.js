import React, { useEffect, useState } from "react";
import { db } from "../firebase_config";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Announcement_Component from "../component/Announcement_Component";
import Announcement_Box from "../component/Announcement_Box";
import { useUserAuth } from "../context/UserAuthContext";
import { useUserClass } from "../context/UserClassContext";
import Alert from "../component/Alert";
import User_Class_Component from "../component/User_Class_Component";
import { BsInfoCircle } from "react-icons/bs";
import sendPushMessage from "../PushMessage/PushMessaging";

const Classroom = () => {
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const { getCurrentDate } = useUserClass();
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState("");
  let { id } = useParams();
  const testData = {
    data: {
      creatorEmail: "test@gmail.com",
      members: ["test@gmail.com"],
      class_name: "Loading...",
    },
  };
  const [members, setMembers] = useState(testData.data.members);
  const [current_class, setCurrent_class] = useState(testData);
  const [editClassName, setEditClassName] = useState("");
  document.title = `Class-Suit | Class`;

  useEffect(() => {
    if (current_class.data.creatorEmail === "test@gmail.com") {
      const unsub = onSnapshot(doc(db, "classes", `${id}`), (doc) => {
        const doc_data = {
          id: doc.id,
          data: doc.data(),
        };
        setCurrent_class(doc_data);
        setMembers(doc_data.data.members);
        setEditClassName(doc_data.data.class_name);
      });
      return () => {
        unsub();
      };
    }
  }, []);
  useEffect(() => {
    try {
      if (current_class) {
        try {
          if (current_class && user.email === current_class.data.creatorEmail) {
            setIsAdmin(true);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("71");
        navigate("/");
      }
    } catch (error) {
      console.log("75");
      navigate("/");
    }
  }, [current_class]);

  useEffect(() => {
    if (members.length !== 0) {
      for (let i = 0; i < members.length; i++) {
        if (!user) {
          return;
        }
        if (members[i] === user.email || members[i] === "test@gmail.com") {
          navigate(`/class/${id}`);
          break;
        } else if (user.email === members[i]) {
          navigate(`/class/${id}`);
          break;
        } else {
          navigate("/");
        }
      }
    }
  }, [members]);

  const [works, setWork] = useState([]);
  const [openTab, setOpenTab] = useState(1);
  useEffect(() => {
    const ref = query(
      collection(db, "classes", `${id}`, "work"),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(ref, (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        const doc_obj = {
          id: doc.id,
          data: doc.data(),
        };
        arr.push(doc_obj);
      });
      arr = arr.reverse();
      setWork(arr);
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  const copyInviteLink = (e) => {
    navigator.clipboard.writeText(e.target.value);
    call_alert("Invite Link Copied!!");
  };

  const deleteAnnouncement = async (
    delete_doc_id,
    annoucemnent_creator,
    class_creator_email
  ) => {
    if (
      user.email === annoucemnent_creator ||
      user.email === class_creator_email
    ) {
      await deleteDoc(doc(db, "classes", `${id}`, "work", `${delete_doc_id}`));
      call_alert("Announcement Deleted!");
    }
  };
  const updateDocumnentDetails = async () => {
    const docRef = doc(db, "classes", `${id}`);
    await updateDoc(docRef, {
      class_name: editClassName,
    }).then(() => {
      call_alert("Settings Updated!!");
    });
  };

  const sendAnnoucement = async (message) => {
    if (message === "") {
      call_alert("Cannot Send Empty Announcement");
      return;
    }
    const docRef = await addDoc(collection(db, "classes", `${id}`, "work"), {
      data: message,
      email: user.email,
      creatorEmail: current_class.data.creatorEmail,
      type: "annoucemnent",
      user: user.displayName,
      date: getCurrentDate(),
      timestamp: serverTimestamp(),
    });
    sendPushMessage("this is new message");
    call_alert("Announcement Sent!");
  };
  const [flag, setflag] = useState(false);
  const call_alert = (content) => {
    setflag(true);
    setMessage(content);
    const timeout = setTimeout(() => {
      setflag(false);
      clearTimeout(timeout);
    }, 10);
  };

  const handleClassNameChange = (e) => {
    setEditClassName(e.target.value);
  };

  return (
    <>
      <Alert flag={flag} message={message} messageSetter={setMessage} />
      <div className="flex flex-wrap">
        <div className="w-3/4 m-auto">
          <div className="flex justify-between my-2 items-center">
            <h1 className="text-4xl font-bold my-4">{editClassName}</h1>
            <a
              className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 h-max rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mx-2"
              href={`https://desk-form.vercel.app/auth/?redirect=createquiz/${id}`}
              target="_blank"
            >
              Create Quiz For This Class
            </a>
          </div>
          <ul
            className="flex gap-3 mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <div className="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer">
              <li
                className={
                  "text-xs font-bold uppercase px-5 py-3 border-2 rounded block leading-normal " +
                  (openTab === 1 ? "text-white bg-slate-400" : "text-black")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Announcement
              </li>
            </div>
            <div className="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer">
              <li
                className={
                  "text-xs font-bold uppercase px-5 py-3 border-2 rounded block leading-normal " +
                  (openTab === 2 ? "text-white bg-slate-400" : "text-black")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Work
              </li>
            </div>
            <div
              className={
                isAdmin
                  ? "block -mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer"
                  : "hidden"
              }
            >
              <li
                className={
                  "text-xs font-bold uppercase px-5 py-3 border-2 rounded block leading-normal " +
                  (openTab === 3 ? "text-white bg-slate-400" : "text-black")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                Members
              </li>
            </div>
            <div
              className={
                isAdmin
                  ? "block -mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer"
                  : "hidden"
              }
            >
              <li
                className={
                  "text-xs font-bold uppercase px-5 py-3 border-2 rounded block leading-normal " +
                  (openTab === 4 ? "text-white bg-slate-400" : "text-black")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
                data-toggle="tab"
                href="#link4"
                role="tablist"
              >
                Settings
              </li>
            </div>
          </ul>

          <div className="relative flex flex-col min-w-0 break-words bg-white w-full m-auto mb-6 rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <Announcement_Component
                    isAdmin={isAdmin}
                    handle_alert={call_alert}
                    current_className={current_class}
                    annoucementFunc={sendAnnoucement}
                  />

                  <h1 className="font-semibold text-xl my-4">
                    Announcements:{" "}
                  </h1>
                  {works.map((work) => {
                    return (
                      <Announcement_Box
                        parentId={id}
                        deleteFunc={deleteAnnouncement}
                        work={work}
                        key={work.data.timestamp}
                      />
                    );
                  })}
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <button
                    className={
                      openTab === 2 && isAdmin
                        ? "bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mx-2"
                        : "hidden"
                    }
                    type="button"
                    onClick={() => {
                      navigate(`/assign/${id}`);
                    }}
                  >
                    Assign Work
                  </button>
                  <hr className="my-2 bg-slate-500" />
                  <div className="mt-4">
                    {works.map((work) => {
                      if (work.data.type !== "assignment") return null;
                      return (
                        <Announcement_Box
                          wordID={work.id}
                          deleteFunc={deleteAnnouncement}
                          work={work}
                          key={work.data.timestamp}
                        />
                      );
                    })}
                  </div>
                </div>
                <div
                  className={openTab === 3 && isAdmin ? "block" : "hidden"}
                  id="link3"
                >
                  <h1 className="text-xl font-bold">Users: </h1>
                  <hr className="bg-slate-500 mb-3" />
                  {user &&
                    members.map((user_email) => {
                      return (
                        <User_Class_Component
                          userEmail={user.email}
                          key={user_email}
                          user={user_email}
                        />
                      );
                    })}
                </div>
                <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                  <h1 className="text-xl font-bold">Settings: </h1>
                  <hr className="bg-slate-500 my-2" />

                  <div className="w-full mt-4">
                    <label
                      htmlFor="className"
                      className="block text-base font-medium text-gray-700 mb-2"
                    >
                      Class Name:
                    </label>
                    <input
                      id="className"
                      className="rounded-md w-full mb-4"
                      placeholder="Class Name"
                      autoComplete="off"
                      value={editClassName}
                      onChange={handleClassNameChange}
                    />
                    <label
                      htmlFor="inviteLink"
                      className="block text-base font-medium text-gray-700 mb-2"
                    >
                      Invite Link:
                    </label>
                    <input
                      id="inviteLink"
                      className="rounded-md w-full mb-4 cursor-pointer"
                      placeholder="Class Name"
                      autoComplete="off"
                      readOnly
                      onFocus={copyInviteLink}
                      onClick={copyInviteLink}
                      value={
                        current_class
                          ? `https://class-suit.vercel.app/invite/${current_class.id}`
                          : null
                      }
                    />

                    <div className="py-4">
                      <div className="flex items-center mr-4 mb-2">
                        <input
                          type="checkbox"
                          id="A3-yes"
                          name="A3-confirmation"
                          value="yes"
                          className="opacity-0 absolute h-8 w-8"
                        />
                        <div className="bg-white border-2 rounded-md border-blue-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                          <svg
                            className="fill-current hidden w-3 h-3 text-blue-600 pointer-events-none"
                            version="1.1"
                            viewBox="0 0 17 12"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g fill="none" fillRule="evenodd">
                              <g
                                transform="translate(-9 -11)"
                                fill="#1F73F1"
                                fillRule="nonzero"
                              >
                                <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                              </g>
                            </g>
                          </svg>
                        </div>
                        <label htmlFor="A3-yes" className="select-none">
                          Allow All To Announce In Class
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mx-2"
                      type="button"
                      onClick={updateDocumnentDetails}
                    >
                      Update
                    </button>

                    <button
                      className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mx-2"
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Classroom;

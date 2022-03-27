import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useUserClass } from "../context/UserClassContext";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const Invite_Class = () => {
  document.title = "Class-Suit | Invite"
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  const { join_class_with_code } = useUserClass();
  const { id } = useParams();
  const { user } = useUserAuth();

  const handleJoinClass = () => {
    join_class_with_code(id, user.email);
    setShowModal(false);
    navigate(`/class`);
  };

  const handleClose = () => {
    setShowModal(false);
    navigate(`/class`);
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center w-max  md:w-3/4 m-auto items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative  my-6 mx-auto w-max md:w-3/4">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Join Class</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <label
                    htmlFor="inviteClass"
                    className="block text-base font-medium text-gray-700 mb-2"
                  >
                    Class ID :
                  </label>
                  <input
                    id="inviteClass"
                    className="rounded-md w-full mb-4"
                    readOnly
                    value={id}
                    autoComplete="off"
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mx-2"
                    type="button"
                    onClick={() => handleClose(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mx-2"
                    type="button"
                    onClick={handleJoinClass}
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Invite_Class;

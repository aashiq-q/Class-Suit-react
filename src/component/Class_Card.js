import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { FaEllipsisV } from "react-icons/fa"
import { db } from "../firebase_config";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { useUserAuth } from "../context/UserAuthContext";

const Class_Card = ({ data, id }) => {
  const  { user } = useUserAuth();
  let path = `/class/${id}`;
  const handleUnenrollClick = () => {
    setModal(true)
  }
  const [modal, setModal] = useState(false);
  const handleClickYes = async () => {
    console.log(id)
    const removalRef = doc(db, "classes", `${id}`);
    await updateDoc(removalRef, {
      members: arrayRemove(user.email)
  });
  
  }
  return (
    <>
    <div>
      <div className="class-card m-auto">
        <div className="card-head">
          <div className="flex justify-between relative">
            <Link to={path} className="class-name overflow-hidden text-ellipsis whitespace-nowrap w-4/6">{data.class_name}</Link>
            <Disclosure as="div" className="absolute right-3 top-2 scale-110 z-40">
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="bg-gray-800 absolute flex text-sm rounded-full">
                    <span className="sr-only">Open user menu</span>
                    <FaEllipsisV/>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <p className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" onClick={handleUnenrollClick}>
                          Unenroll
                        </p>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </Disclosure>
          </div>
          <Link to={path} className="class-creator">{data.creator}</Link>
        </div>
        <div className="card-profile">
          <img src={data.creatorPhoto} alt="" />
        </div>
        <div className="card-body"></div>
      </div>
    </div>
    {modal ? (
        <>
          <div className="justify-center w-max  md:w-2/4 m-auto items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative  my-6 mx-auto w-max md:w-3/4">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Unenroll Class</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
               <p className="text-center font-bold text-xl my-4">
                 Do You really wanted to leave the class?
               </p>
                {/*footer*/}
                <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mx-2"
                    type="button"
                    onClick={() => setModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mx-2"
                    type="button"
                    onClick={handleClickYes}
                  >
                    Leave
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

export default Class_Card;

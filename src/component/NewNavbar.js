/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { BiRightArrowAlt, BiLeftArrowAlt, BiPlus } from "react-icons/bi";
import { useUserAuth } from "../context/UserAuthContext";
import { Link, useLocation } from "react-router-dom";
import { useUserClass } from "../context/UserClassContext";
const navigation = [
  { name: "Main", href: "/", current: true },
  { name: "About", href: "/about", current: false },
  { name: "Contact", href: "/contact", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NewNavbar() {
  const { create_class, join_class_with_code } = useUserClass();
  const { user, logOut } = useUserAuth();

  useEffect(() => {
    setPhotoURL(user && user.photoURL);
  }, [user]);

  const [PhotoURL, setPhotoURL] = useState("");
  const [show_menu, set_show_menu] = useState(true);
//   const [leaveClass, setLeaveClass] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/auth") {
      set_show_menu(false);
    }
	// else if(location.pathname.includes("/class")){
	// 	setLeaveClass(false)
	// }
	 else {
      set_show_menu(true);
    }
  }, [location]);

  const [create_class_name, setCreate_class_name] = useState();
  const [join_class_id, setJoin_class_id] = useState();

  const handleCreateClass = () => {
    if (create_class_name === "") {
      return;
    }
    create_class(create_class_name);
    setCreateClassModal(false);
  };
  const handleJoinClass = () => {
    if (join_class_id === "") {
      return;
    }
    join_class_with_code(join_class_id, user.email);
    try {
      setJoinClassModal(false);
    } catch (error) {}
  };

  const handle_create_class_change = (e) => {
    setCreate_class_name(e.target.value);
  };
  const handle_join_class_change = (e) => {
    setJoin_class_id(e.target.value);
  };

  const handleForward = () => {
    window.history.forward();
  };
  const handleBackward = () => {
    window.history.back();
  };

  const [CreateClassModal, setCreateClassModal] = useState(false);

  const [JoinClassModal, setJoinClassModal] = useState(false);
  
  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-full w-full mx-auto px-2 sm:px-6 lg:px-8 py-2">
              <div className="relative flex items-center justify-between h-16">
                <div
                  className={
                    show_menu ? "text-white mr-8 hidden md:flex" : "hidden"
                  }
                >
                  <span
                    onClick={handleBackward}
                    className="mx-2 text-2xl p-1 rounded-full bg-slate-500 hover:bg-slate-400 duration-200 cursor-pointer"
                  >
                    <BiLeftArrowAlt />
                  </span>
                  <span
                    onClick={handleForward}
                    className="mx-2 text-2xl p-1 rounded-full bg-slate-500 hover:bg-slate-400 duration-200 cursor-pointer"
                  >
                    <BiRightArrowAlt />
                  </span>
                </div>
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src="/logoSVG.svg"
                      alt="Workflow"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src="/logo.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Menu as="div" className={show_menu ? "ml-3 relative mr-5" : "hidden"}>
                    <div>
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <button
                          type="button"
                          className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                          <span className="sr-only">View notifications</span>
                          <BiPlus className="h-6 w-6" aria-hidden="true" />
                        </button>
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
                            <p
                              className={ active ? "bg-gray-100 block px-4 py-2 text-sm text-gray-700 cursor-pointer" : "block px-4 py-2 text-sm text-gray-700 cursor-pointer"}
                              onClick={() => setCreateClassModal(true)}
                            >
                              Create Class
                            </p>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <p
							className={ active ? "bg-gray-100 block px-4 py-2 text-sm text-gray-700 cursor-pointer" : "block px-4 py-2 text-sm text-gray-700 cursor-pointer"}
                              onClick={() => setJoinClassModal(true)}
                            >
                              Join Class
                            </p>
                          )}
                        </Menu.Item>
                        {/* <Menu.Item>
                          {({ active }) => (
                            <p
                              className={
                                leaveClass
                                  ? "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                  : "hidden"
                              }
                            >
                              Leave Class
                            </p>
                          )}
                        </Menu.Item> */}
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={PhotoURL}
                          alt=""
                        />
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
                            <a
                             onClick={() => {logOut()}}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {CreateClassModal ? (
        <>
          <div className="justify-center w-max  md:w-3/4 m-auto items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative  my-6 mx-auto w-max md:w-3/4">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Create Class</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setCreateClassModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <label
                    htmlFor="classId"
                    className="block text-base font-medium text-gray-700 mb-2"
                  >
                    Class Name :
                  </label>
                  <input
                    id="classId"
                    className="rounded-md w-full mb-4"
                    placeholder="Class Name"
                    value={create_class_name}
                    onChange={handle_create_class_change}
                    autoComplete="off"
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mx-2"
                    type="button"
                    onClick={() => setCreateClassModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mx-2"
                    type="button"
                    onClick={handleCreateClass}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {JoinClassModal ? (
        <>
          <div className="justify-center w-max  md:w-3/4 m-auto items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative  my-6 mx-auto w-max md:w-3/4">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Join Class</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setJoinClassModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <label
                    htmlFor="joinClassID"
                    className="block text-base font-medium text-gray-700 mb-2"
                  >
                    Class ID :
                  </label>
                  <input
                    id="joinClassID"
                    className="rounded-md w-full mb-4"
                    placeholder="Class ID"
                    value={join_class_id}
                    onChange={handle_join_class_change}
                    autoComplete="off"
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mx-2"
                    type="button"
                    onClick={() => setJoinClassModal(false)}
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
}

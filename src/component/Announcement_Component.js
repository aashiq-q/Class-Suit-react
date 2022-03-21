import React, { useState } from "react";
import { useUserClass } from "../context/UserClassContext";

const Announcement_Component = ({
  annoucementFunc,
  current_className,
  handle_alert
}) => {
  const [announcementInput, setAnnouncementInput] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    annoucementFunc(announcementInput);
    setAnnouncementInput("");
  };
  const handleAnnouncementChange = (e) => {
    setAnnouncementInput(e.target.value);
  };

  const copy_class_code = () => {
    navigator.clipboard.writeText(current_className.id);
    handle_alert("Classroom Code Copied!!")
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap items-end justify-between"
      >
        <div className="flex justify-between rounded items-center w-full p-3 border-gray-300 border-2 mb-5">
          <p className="font-medium">Classroom Code: {current_className.id}</p>
          <button
            className="bg-blue-500 text-white active:bg-blue-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={copy_class_code}
          >
            Copy
          </button>
        </div>
        <div className="w-full">
          <label
            htmlFor="announcement"
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            Announcement :
          </label>
          <textarea
            id="announcement"
            className="resize-none rounded-md w-full"
            placeholder="Announcement Message Here..."
            value={announcementInput}
            onChange={handleAnnouncementChange}
          ></textarea>
          <button
            className="bg-blue-500 text-white active:bg-blue-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none my-2 ease-linear transition-all duration-150"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
      <hr className="mt-4 bg-slate-600" />
    </>
  );
};

export default Announcement_Component;

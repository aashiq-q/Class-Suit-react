import React from "react";
import { useUserClass } from "../context/UserClassContext";

const CreateWork = () => {
  const { handleOpenPicker, fileData } = useUserClass();
  console.log(fileData);
  return (
    <div>
      <>
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
          />
        </div>
        <div className="relative p-6 pt-0 flex-auto">
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
          />
        </div>

		<div className="flex">
			<div className="flex justify-start items-center border-2 rounded-lg p-2 w-40">
				<img className="pr-2" src="https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png" alt="" />
				<a className="font-semibold">Filename</a>
			</div>
		</div>
        <button onClick={() => handleOpenPicker()}>Open Picker</button>
      </>
    </div>
  );
};

export default CreateWork;

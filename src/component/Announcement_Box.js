import React from "react";

const Announcement_Box = ({work, deleteFunc}) => {
  const { data, id } = work;
  const handleClick = () => {
    deleteFunc(id, data.email, data.creatorEmail)
  }
  return (
    <div className="w-full border-2 rounded-md text-base border-gray-300  mb-4">
      <div className="bg-slate-600 rounded text-gray-200 p-4 py-2 flex justify-between items-center">
        <div>
          <p className="font-semibold">{data.user}</p>
          <p className="text-xs">{data.date}</p>
        </div>
        <div>
          <i className="cursor-pointer bi bi-trash3-fill" onClick={handleClick}></i>
        </div>
      </div>
      <hr className="mb-2 bg-slate-600" />
      <p className="p-4 py-2">
       {data.data}
      </p>
    </div>
  );
};

export default Announcement_Box;

import React from "react";

const FileNameDisplay = ({file}) => {
  const { name, url } = file
  return (
    <>
      <a href={url} target="_blank" title={name} className="hover:text-blue-500 hover:border-blue-500 duration-300 displayFile overflow-hidden h-12 flex justify-start items-center border-2 rounded-lg p-2 w-48 m-2">
        <img
          className="pr-2"
          src="https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png"
          alt=""
        />
        <p className="font-semibold">{ name }</p>
      </a>
    </>
  );
};

export default FileNameDisplay;

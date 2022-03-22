import React from "react";

const FileNameDisplay = ({file}) => {
  const { name } = file
  return (
    <>
      <div className="flex justify-start items-center border-2 rounded-lg p-2 w-48 m-2">
        <img
          className="pr-2"
          src="https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png"
          alt=""
        />
        <a className="font-semibold">{ name }</a>
      </div>
    </>
  );
};

export default FileNameDisplay;

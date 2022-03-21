import React from "react";
// import { drive } from
// import { deleteFile, uploadFile } from "../Backend/HandleDrive";

const UploadFiles = () => {
  const handleChangeFile = (e) => {
    var fil = document.getElementById("myFile");
    alert(fil.value);
    // uploadFile(fil.value)
  };
  return (
    <>
      <input type="file" id="myFile"/>
      <button onClick={handleChangeFile}>CLick</button>
    </>
  );
};

export default UploadFiles;

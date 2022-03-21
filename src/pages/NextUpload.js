import React from "react";
import GdfsPath from "gdrive-fs/build/gdrive-fs";
import { loadApi, getFileList, mkdir, createFile, uploadFile } from "gdrive-fs";
// const GdfsEvent = require("./gdfs-event.js");

const NextUpload = () => {
  const cId =
    "9795694558-3mhtthqopjqa000ql2to27i07ohdmqua.apps.googleusercontent.com";
  const clientSec = "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";
  const apiKey = "AIzaSyAHGFdPN9zrZs0rbX5M73nEyxExcd_SPGU";
  loadApi(cId, clientSec);
  const signInBtn = () => {
	// const abcd =  uploadFile()
	// console.log(abcd)
  };
  const handleChange = (e) => {
	const selectedFile = e.target.result
	const reader = new FileReader()
	reader.onload = function(e) {
		console.log(reader.readAsArrayBuffer(e.target.result));
	  console.log(reader);
	};
	// const abcd =  uploadFile(selectedFile)
	// console.log(abcd)
  }
  return (
    <>
	<input type="file" onChange={handleChange}/>
      <button onClick={signInBtn}>SignIn</button>
    </>
  );
};

export default NextUpload;

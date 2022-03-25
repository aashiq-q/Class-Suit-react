import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import FileNameDisplay from "../component/FileNameDisplay"

const Accordian = ({ data }) => {
  console.log(data)
  const [isShown, setIsShown] = useState(false);
  const handleAccordian = () => {
    isShown ? setIsShown(false) : setIsShown(true)
  }
  return (
    <>
      <div className="w-3/4 m-auto my-4 rounded-lg overflow-hidden duration-200">
        <div className={isShown ? "cursor-pointer border-2 p-3 rounded-t-lg flex justify-between items-center" : "flex justify-between items-center rounded-t-lg rounded-b-lg cursor-pointer border-2 p-3"}  onClick={handleAccordian}>
          <p className="font-extrabold text-blue-600 flex">{data.user} <div className="text-black ml-1 font-light">({data.email})</div></p>
          { !isShown ? <FaChevronDown/> : <FaChevronUp/>}
        </div>
        <div className={isShown ? "flex flex-wrap duration-300 border-2 p-3 border-t-0 rounded-lg rounded-t-none overflow-hidden" : "accordian_hidden"}>
            {
              data && data.regions.map(files => {
                return <FileNameDisplay file={{name: files.filename, url: files.url}}/>
              })
            }
        </div>
      </div>
    </>
  );
};

export default Accordian;

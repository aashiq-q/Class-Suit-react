import React, { useState } from "react";
import { BsBookmarkPlus, BsGoogle, BsTrophyFill } from "react-icons/bs";
import { FaWikipediaW } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";

const Bookmark = () => {
  const [isClosed, setIsClosed] = useState(true);
  const handleBookmark = () => {
    isClosed ? setIsClosed(false) : setIsClosed(true);
  };
  let default_bookmarks = [
    {
      name: "Google",
      url: "https://www.google.com"
    }
  ]
  // const 
  return (
    <>
      <div
        title="Bookmarks"
        className="right-3 md:right-9 bottom-9 bg-white duration-300 shadow-lg fixed flex justify-center flex-col-reverse items-center rounded-full border-2 p-3 md:scale-125 cursor-pointer"
        style={{WebkitTapHighlightColor: "transparent"}}
      >
        <div onClick={handleBookmark}>
          {/* <input type="checkbox" id="isClosed" checked={isClosed} className="hidden"/> */}
          <BsBookmarkPlus />
        </div>
        <div
          className={
            isClosed
              ? "w-0 overflow-hidden duration-300"
              : "w-max duration-300 mb-3"
          }
        >
          <a href="https://www.britannica.com/" target="_blank"><BsTrophyFill className={isClosed ? "hidden" : "block my-3"} /></a>
          <a href="https://www.brightstorm.com/" target="_blank"><GiBrain className={isClosed ? "hidden" : "block my-3"} /></a>
          <a href="https://en.wikipedia.org/wiki/Main_Page" target="_blank"><FaWikipediaW className={isClosed ? "hidden" : "block my-3"} /></a>
          <a href="https://www.google.com" target="_blank"><BsGoogle className={isClosed ? "hidden" : "block my-3"} /></a>
        </div>
      </div>
    </>
  );
};

export default Bookmark;

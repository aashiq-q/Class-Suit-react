import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa"

const Accordian = () => {
  const [isShown, setIsShown] = useState(false);
  const handleAccordian = () => {
    isShown ? setIsShown(false) : setIsShown(true)
  }
  return (
    <>
      <div className="w-3/4 m-auto my-4 rounded-lg overflow-hidden">
        <div className="border-2 p-3 rounded-t-lg"  onClick={handleAccordian}>
          <p className="font-bold">Accordian heading</p>
          <FaChevronDown/>
        </div>
        <div className={isShown ? "duration-300 border-2 p-3 border-t-0 rounded-lg rounded-t-none overflow-hidden" : "accordian_hidden"}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum nam expedita sequi, explicabo sunt ipsa doloribus eligendi non error quibusdam eum facilis beatae deserunt repellendus ut vel nostrum, quasi autem!
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda facilis quo saepe ea iure molestiae, aperiam a minima molestias similique magnam eligendi explicabo minus expedita deserunt provident vel suscipit eveniet!
          </p>
        </div>
      </div>
    </>
  );
};

export default Accordian;

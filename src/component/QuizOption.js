import React, { useState } from "react";

const QuizOption = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (e) => {
    setIsChecked(e.target.checked);
	isChecked ? setIsChecked(false) : setIsChecked(true)
  };
  return (
    <label className={isChecked ? 
		"cursor-pointer form-label items-center flex w-3/4 border-2 p-3 rounded-lg m-auto mt-2 border-blue-600" : 
		"form-label items-center flex w-3/4 border-2 p-3 rounded-lg m-auto mt-2 cursor-pointer"}>
      <input
        type="radio"
        className="form-radio"
        name="accountType"
        value="personal"
		checked={isChecked}
        onClick={handleChange}
      />
      <span className="ml-2">Personal</span>
    </label>
  );
};

export default QuizOption;

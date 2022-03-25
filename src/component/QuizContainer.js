import React from "react";
import QuizOption from "./QuizOption";

const QuizContainer = () => {
  return (
    <div className="w-3/4 m-auto mt-4">
      <h1 className="font-bold text-xl">Question : </h1>
      <QuizOption />
    </div>
  );
};

export default QuizContainer;

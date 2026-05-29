import type { Dispatch } from "react";
import type { Action, QuestionType, State } from "../App";

interface OptionsProps {
  options: QuestionType["options"];
  dispatch: Dispatch<Action>;
  answer: State["answer"];
  correctOption: QuestionType["correctOption"];
}

const Options = ({
  options,
  dispatch,
  answer,
  correctOption,
}: OptionsProps) => {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;

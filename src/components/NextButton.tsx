import type { Dispatch } from "react";
import type { Action, State } from "../App";

interface NextButtonProps {
  dispatch: Dispatch<Action>;
  answer: State["answer"];
  index: State["index"];
  numQuestions: number;
}
const NextButton = ({
  dispatch,
  answer,
  index,
  numQuestions,
}: NextButtonProps) => {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Siguiente
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finalizar
      </button>
    );
};

export default NextButton;

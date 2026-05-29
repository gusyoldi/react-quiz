import type { Dispatch } from "react";
import type { Action } from "../App";

interface StartScreen {
  numQuestions: number;
  dispatch: Dispatch<Action>;
}

const StartScreen = ({ numQuestions, dispatch }: StartScreen) => {
  return (
    <div className="start">
      <h2>Bienbenidxs a React Quiz!</h2>
      <h3>{numQuestions} preguntas sobre React</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Comenzar
      </button>
    </div>
  );
};

export default StartScreen;

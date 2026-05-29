import type { Dispatch } from "react";
import type { Action, QuestionType, State } from "../App";
import Options from "./Options";

interface QuestionProps {
  currQuestion: QuestionType;
  dispatch: Dispatch<Action>;
  answer: State["answer"];
}

const Question = ({ currQuestion, dispatch, answer }: QuestionProps) => {
  const { question, options, correctOption } = currQuestion;

  return (
    <div>
      <h4>{question}</h4>
      <Options
        options={options}
        dispatch={dispatch}
        answer={answer}
        correctOption={correctOption}
      />
    </div>
  );
};

export default Question;

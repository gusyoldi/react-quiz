import { useQuiz } from "../context/QuizContext";
import Options from "./Options";

const Question = () => {
  const { dispatch, answer, questions, index } = useQuiz();

  const { question, options, correctOption } = questions[index];

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

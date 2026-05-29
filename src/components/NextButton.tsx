import { useQuiz } from "../context/QuizContext";

const NextButton = () => {
  const { answer, index, numQuestions, dispatch } = useQuiz();

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

import { useQuiz } from "../context/QuizContext";

const StartScreen = () => {
  const { numQuestions, dispatch } = useQuiz();

  return (
    <div className="start">
      <h2>Bienvenidos a React Quiz!</h2>
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

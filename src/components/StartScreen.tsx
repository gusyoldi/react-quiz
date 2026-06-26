import { useQuiz } from "../context/QuizContext";
import TechFilter from "./TechFilter";

const StartScreen = () => {
  const { numQuestions, selectedSlug, technologies, dispatch } = useQuiz();

  const selectedTech = technologies.find((t) => t.slug === selectedSlug);

  return (
    <div className="start">
      <h2>Bienvenidxs a StackQuiz!</h2>
      <h3>Elegí una tecnología para empezar</h3>

      <TechFilter />

      {selectedTech ? (
        <h3>
          {numQuestions} preguntas sobre {selectedTech.name}
        </h3>
      ) : (
        <p>Seleccioná una tecnología arriba</p>
      )}
      <button
        className="btn btn-ui"
        disabled={!selectedTech || numQuestions === 0}
        onClick={() => dispatch({ type: "start" })}
      >
        Comenzar
      </button>
    </div>
  );
};

export default StartScreen;

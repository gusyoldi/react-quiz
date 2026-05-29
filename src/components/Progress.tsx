import { useQuiz } from "../context/QuizContext";

const Progress = () => {
  const { index, numQuestions, points, maxPossiblePoints, answer } = useQuiz();

  return (
    <header className="progress">
      <progress value={index + Number(answer !== null)} max={numQuestions} />
      <p>
        Pregunta: <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPossiblePoints} Puntos
      </p>
    </header>
  );
};

export default Progress;

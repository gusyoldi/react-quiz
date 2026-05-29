import type { State } from "../App";

interface ProgressProps {
  index: State["index"];
  numQuestions: number;
  points: State["points"];
  maxPossiblePoints: number;
  answer: State["answer"];
}

const Progress = ({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  answer,
}: ProgressProps) => {
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

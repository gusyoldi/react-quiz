import type { Dispatch } from "react";
import type { Action, State } from "../App";

interface FinishScreenProps {
  points: State["points"];
  maxPossiblePoints: number;
  highscore: number;
  dispatch: Dispatch<Action>;
}

const FinishScreen = ({
  points,
  maxPossiblePoints,
  highscore,
  dispatch,
}: FinishScreenProps) => {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦🏻‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> Tu puntuacion fué <strong>{points}</strong> de{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Puntuación máxima: {highscore} puntos)</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Reiniciar quiz
      </button>
    </>
  );
};

export default FinishScreen;

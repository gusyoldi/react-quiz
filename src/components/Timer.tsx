import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

const Timer = () => {
  const { secondsRemaning, dispatch } = useQuiz();

  if (secondsRemaning === null) return null;

  const mins = Math.floor(secondsRemaning / 60);
  const seconds = secondsRemaning % 60;
  const addZero = (time: number) => (time < 10 ? `0${time}` : time);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      <svg
        className="timer-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
      <span>
        {addZero(mins)}:{addZero(seconds)}
      </span>
    </div>
  );
};

export default Timer;

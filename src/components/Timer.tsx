import { useEffect, type Dispatch } from "react";
import type { Action, State } from "../App";

interface TimerProps {
  dispatch: Dispatch<Action>;
  secondsRemaning: State["secondsRemaning"];
}

const Timer = ({ secondsRemaning, dispatch }: TimerProps) => {
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
      {addZero(mins)}:{addZero(seconds)}
    </div>
  );
};

export default Timer;

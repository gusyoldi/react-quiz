import { useReducer } from "react";

type State = {
  count: number;
  step: number;
};

type Action =
  | { type: "inc" }
  | { type: "dec" }
  | { type: "reset" }
  | { type: "defineCount"; payload: number }
  | { type: "defineStep"; payload: number };

const initialState = { count: 0, step: 1 };

/* prettier-ignore */
function reducer(state: State , action: Action) {
  switch (action.type) {
    case 'inc': return {...state, count: state.count + state.step}
    case 'dec': return {...state, count: state.count - state.step}
    case 'defineCount': return {...state, count: action.payload}
    case 'defineStep': return {...state, step: action.payload}
    case 'reset': return initialState

    default: throw new Error('Unknown action.type')
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
  };

  const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "defineCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "defineStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

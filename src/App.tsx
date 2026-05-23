import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import "./index.css";

type APIResponse = {
  questions: Question[];
};

type Question = {
  question: string;
  options: string;
  correctOption: number;
  points: number;
};

type State = {
  questions: Question[];
  //status: loading |
  status: "loading" | "ready" | "error" | "active" | "finished";
};

type Action = {
  payload?: any;
  type: "dataRecived" | "dataFailed";
};

const initialState: APIResponse = { questions: [] };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Unknown action.type");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http:/localhost:8000/questions")
      .then((res) => res.json)
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => {
        console.error(err);
        dispatch({ type: "dataFail" });
      });
  }, []);

  return (
    <div>
      <div className="app">
        <Header />
        <Main>
          <p>1/15</p>
          <p>Question</p>
        </Main>
      </div>
    </div>
  );
}

export default App;

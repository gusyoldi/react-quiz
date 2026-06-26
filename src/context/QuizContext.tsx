import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import { supabase } from "../lib/supabase";

const QuizContext = createContext<QuizContextType | undefined>(undefined);

type QuizContextType = State & {
  maxPossiblePoints: number;
  numQuestions: number;
  dispatch: Dispatch<Action>;
};

export type QuestionType = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

export type Technology = {
  slug: string;
  name: string;
  color: string;
  questions: QuestionType[];
};

export type State = {
  technologies: Technology[];
  selectedSlug: string | null;
  questions: QuestionType[];
  status: "loading" | "ready" | "error" | "active" | "finished";
  index: number;
  answer: null | number;
  points: number;
  highscore: number;
  secondsRemaning: null | number;
};

export type Action =
  | { type: "dataRecived"; payload: Technology[] }
  | { type: "dataFailed" }
  | { type: "selectTech"; payload: string }
  | { type: "start" }
  | { type: "nextQuestion" }
  | { type: "newAnswer"; payload: State["answer"] }
  | { type: "finish" }
  | { type: "restart" }
  | { type: "tick" };

const initialState: State = {
  technologies: [],
  selectedSlug: null,
  questions: [],
  index: 0,
  status: "loading",
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaning: null,
};

const SECS_PER_QUESTION = 30;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "dataRecived":
      return { ...state, technologies: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "selectTech": {
      const tech = state.technologies.find((t) => t.slug === action.payload);
      return {
        ...state,
        selectedSlug: action.payload,
        questions: tech?.questions ?? [],
        index: 0,
        answer: null,
        points: 0,
        status: "ready",
      };
    }
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaning: state.questions.length * SECS_PER_QUESTION,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question?.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        technologies: state.technologies,
        selectedSlug: state.selectedSlug,
        questions: state.questions,
        highscore: state.highscore,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaning: state.secondsRemaning! - 1,
        status: state.secondsRemaning === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown action.type");
  }
}

const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [
    {
      technologies,
      selectedSlug,
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaning,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPossiblePoints = questions.reduce(
    (acc, curr) => acc + curr.points,
    0,
  );
  const numQuestions = questions.length;

  useEffect(() => {
    supabase
      .from("technologies")
      .select("slug, name, color, questions(question, options, correctOption:correct_option, points)")
      .order("slug")
      .then(({ data, error }) => {
        if (error || !data) {
          console.error(error);
          dispatch({ type: "dataFailed" });
          return;
        }
        dispatch({ type: "dataRecived", payload: data as Technology[] });
      });
  }, []);

  return (
    <QuizContext.Provider
      value={{
        technologies,
        selectedSlug,
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaning,
        maxPossiblePoints,
        numQuestions,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");

  return context;
};

export { QuizProvider, useQuiz };

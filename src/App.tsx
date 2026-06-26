import ErrorMessage from "./components/Error";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Main from "./components/Main";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Question from "./components/Question";
import StartScreen from "./components/StartScreen";
import Timer from "./components/Timer";
import type { CSSProperties } from "react";
import { useQuiz } from "./context/QuizContext";
import "./index.css";

function App() {
  const { status, selectedSlug, technologies } = useQuiz();

  const glow = technologies.find((t) => t.slug === selectedSlug)?.color;

  return (
    <div
      className="app"
      style={glow ? ({ "--glow": glow } as CSSProperties) : undefined}
    >
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorMessage />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;

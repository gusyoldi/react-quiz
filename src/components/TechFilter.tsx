import type { CSSProperties } from "react";
import { useQuiz } from "../context/QuizContext";

const TechFilter = () => {
  const { technologies, selectedSlug, dispatch } = useQuiz();

  if (technologies.length === 0) return null;

  return (
    <div className="tech-filter">
      {technologies.map((tech) => (
        <button
          key={tech.slug}
          className={`btn btn-tech ${
            tech.slug === selectedSlug ? "active" : ""
          }`}
          style={{ "--tech-color": tech.color } as CSSProperties}
          onClick={() => dispatch({ type: "selectTech", payload: tech.slug })}
        >
          {tech.name}
        </button>
      ))}
    </div>
  );
};

export default TechFilter;

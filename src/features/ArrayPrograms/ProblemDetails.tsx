import React, { useEffect, useState } from "react";
import type { ProblemItem } from "../../global";
import { useNavigate, useParams } from "react-router-dom";
import { arrayProblems } from "./arrayProblemsData";

const ProblemDetails = () => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const { programId } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState<ProblemItem | null>(null);

  useEffect(() => {
    console.log({ programId, arrayProblems });
    if (arrayProblems) {
      const prob = arrayProblems.find((p) => p.id === programId);
      if (prob) {
        setProblem(prob);
      }
      console.log({ prob, problem, programId });
    }
  }, [programId]);

  if (!problem) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(problem.code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="p-6 border w-full rounded-xl shadow-inner bg-white overflow-y-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-red-500 underline mb-3"
      >
        ← Back to list
      </button>
      {problem && (
        <>
          <h3 className="text-2xl font-bold mb-2">{problem.title}</h3>
          <p className="text-gray-700">{problem.explanation}</p>
          <div className="text-gray-600 whitespace-pre-wrap">
            <span className="mr-2 font-semibold">Problem:</span>
            <pre className="text-sm">{problem.problemStatement}</pre>
          </div>
          {problem && (
            <div className="my-4 flex justify-center items-center p-10">
              {problem.component && <div>{problem.component}</div>}
            </div>
          )}
          <button
            onClick={() => setShowCode(!showCode)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            {showCode ? "Hide Code" : "Show Code"}
          </button>
        </>
      )}
      {/* show code block */}
      {showCode && (
        <div className="mt-4 relative">
          {/* Copy to Clipboard Button */}
          <button
            onClick={handleCopy}
            className="px-3 py-1 bg-gray-700 text-white text-sm rounded-md absolute top-2 right-2"
          >
            {copied ? "Copied ✔" : "Copy Code"}
          </button>
          <pre className="mt-2 p-4 bg-gray-900 text-green-300 rounded-lg overflow-x-auto text-sm">
            {problem.code}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ProblemDetails;

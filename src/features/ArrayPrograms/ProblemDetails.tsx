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
    const prob = arrayProblems.find((p) => p.id === programId);
    if (prob) setProblem(prob);
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
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-dark-800 p-4 sm:p-6 rounded-xl shadow-md overflow-y-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-red-500 hover:text-red-600 underline mb-4 text-sm font-medium"
      >
        ← Back to list
      </button>
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        {problem.title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        {problem.explanation}
      </p>

      {/* Problem Statement */}
      <div className="bg-gray-50 dark:bg-dark-700 p-4 rounded-lg mb-6">
        <span className="font-semibold text-gray-800 dark:text-gray-200">
          Problem Statement:
        </span>
        <pre className="mt-2 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {problem.problemStatement}
        </pre>
      </div>

      {/* Render Demo Component */}
      {problem.component && (
        <div className="my-6 flex justify-center items-center">
          <div className="w-full max-w-xl">{problem.component}</div>
        </div>
      )}

      <button
        onClick={() => setShowCode(!showCode)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded-md mt-2"
      >
        {showCode ? "Hide Code" : "Show Code"}
      </button>

      {/* Code Block */}
      {showCode && (
        <div className="mt-4 relative">
          <button
            onClick={handleCopy}
            className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded absolute top-2 right-2"
          >
            {copied ? "Copied ✔" : "Copy Code"}
          </button>

          <pre className="mt-2 p-4 bg-gray-900 text-green-300 rounded-lg overflow-x-auto text-sm leading-relaxed">
            {problem.code}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ProblemDetails;

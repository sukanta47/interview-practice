import React, { useState } from "react";
import type { ProblemItem } from "../../global";
import ProblemCard from "../ui/ProblemCard";
import { useNavigate } from "react-router-dom";
// import ProblemDetails from "../ui/ProblemDetails";

interface Props {
  title: string;
  problems: ProblemItem[];
}

const ProblemsLayout: React.FC<Props> = ({ title, problems }) => {
  const [selected, setSelected] = useState<ProblemItem | null>(null);
  const navigate = useNavigate();
  const handleNavigate = (id: string) => {
    navigate(`/array-programs/${id}`);
  };
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>

      {!selected && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((p) => (
            <ProblemCard
              key={p.id}
              item={p}
              onSelect={(_id) => handleNavigate(_id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProblemsLayout;

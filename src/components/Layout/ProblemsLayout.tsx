import React, { useState } from "react";
import type { ProblemItem } from "../../global";
import ProblemCard from "../ui/ProblemCard";
import { useNavigate } from "react-router-dom";

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
    <div className="w-full mx-auto max-w-7xl">
      <h1 className="text-2xl sm:text-3xl mb-6 md:mb-10 lg:text-5xl font-bold text-pink-600">
        {title}
      </h1>

      {!selected && (
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4 
            gap-4 sm:gap-6
          "
        >
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

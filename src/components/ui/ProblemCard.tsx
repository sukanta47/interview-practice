import React from "react";
import type { ProblemItem } from "../../global";

interface CardProps {
  item: ProblemItem;
  onSelect: (id: string) => void;
}

const ProblemCard: React.FC<CardProps> = ({ item, onSelect }) => {
  return (
    <div
      className="border rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition"
      onClick={() => onSelect(item.id)}
    >
      <h2 className="text-lg font-semibold">{item.title}</h2>
      <p className="text-sm mt-1 text-gray-600">{item.description}</p>
    </div>
  );
};

export default ProblemCard;

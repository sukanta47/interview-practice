import React from "react";

type CalculatorDisplayProps = {
  expression: string;
  result: number;
};

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({
  expression,
  result,
}) => {
  return (
    <div className="w-full max-w-[242px] bg-slate-900 text-right p-4 rounded-t-2xl shadow-inner max-h-[10rem] overflow-y-auto">
      <div id="expression" className="text-slate-400 text-lg break-all min-h-[2.5rem]">
        {expression || "0"}
      </div>
      <div id="result" className="text-white text-4xl font-semibold mt-1 break-all">
        {result || "0"}
      </div>
    </div>
  );
};

export default CalculatorDisplay;

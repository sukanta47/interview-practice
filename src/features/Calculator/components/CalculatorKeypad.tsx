import {
  ArrowLeft,
  Divide,
  Equal,
  Minus,
  Percent,
  Plus,
  X,
} from "lucide-react";
import {
  numericKeys,
  operatorKeys,
  topKeys,
  type CalculatorKey,
} from "./calculator-data";

interface CalculatorKeypadProps {
  onOperatorKeyClick: (key: CalculatorKey) => void;
  onNumKeyClick: (key: CalculatorKey) => void;
  onContolKeyClick: (key: CalculatorKey) => void;
}
const CalculatorKeypad = ({
  onNumKeyClick,
  onContolKeyClick,
  onOperatorKeyClick,
}: CalculatorKeypadProps) => {
  const getIcon = ({ name, key, keyCode }: { name: string; key: string; keyCode:string }) => {
    switch (name) {
      case "Backspace":
        return <ArrowLeft name={keyCode}/>;
      case "Percent":
        return <Percent name={keyCode}/>;
      case "Divide":
        return <Divide name={keyCode}/>;
      case "Multiply":
        return <X name={keyCode}/>;
      case "Subtract":
        return <Minus name={keyCode}/>;
      case "Add":
        return <Plus name={keyCode}/>;
      case "Equal":
        return <Equal name={keyCode}/>;

      default:
        return key;
    }
  };

  return (
    <div className="flex gap-2 w-full justify-center">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-2 w-full">
          {topKeys.map((tkey: CalculatorKey) => (
            <button
              key={tkey.key}
              name={tkey.keyCode}
              aria-label={tkey.keyCode}
              className={`p-4 flex justify-center items-center border-none rounded-full text-lg text-white bg-${
                tkey.bgColor
              } hover:bg-${tkey.bgColor.split("-")[0]}-800 w-14 h-14`}
              onClick={() => onContolKeyClick(tkey)}
            >
              {getIcon(tkey)}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 w-full">
          {numericKeys.map((nkey: CalculatorKey) => (
            <button
              key={nkey.key}
              name={nkey.keyCode}
              aria-label={nkey.keyCode}
              className={`p-4 flex justify-center items-center border-none rounded-full text-lg text-white bg-${
                nkey.bgColor
              } hover:bg-${nkey.bgColor.split("-")[0]}-800 w-14 h-14`}
              onClick={() => onNumKeyClick(nkey)}
            >
              {getIcon(nkey)}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {operatorKeys.map((okey: CalculatorKey) => (
          <button
            key={okey.key}
            name={okey.keyCode}
            aria-label={okey.keyCode}
            className={`p-4 flex justify-center items-center rounded-full text-lg text-white bg-${
              okey.bgColor
            } hover:bg-${okey.bgColor.split("-")[0]}-500 w-14 h-14`}
            onClick={() => onOperatorKeyClick(okey)}
          >
            {getIcon(okey)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalculatorKeypad;

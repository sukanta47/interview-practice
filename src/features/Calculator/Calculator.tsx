import React, { useEffect, useRef, useState } from "react";
import CalculatorDisplay from "./components/CalculatorDisplay";
import {
  allowedKey,
  numericKeys,
  operatorKeys,
  topKeys,
  type CalculatorKey,
} from "./components/calculator-data";
import CalculatorKeypad from "./components/CalculatorKeypad";

const Calculator = () => {
  const allkeysArr = [numericKeys, operatorKeys, topKeys];
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [result, setResult] = useState<number>(0);
  const [expression, setExpression] = useState<string>("");
  const [sign, setSign] = useState(true);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const pressedKey = e.key;
      if (!allowedKey.has(pressedKey)) return;
      let _key: CalculatorKey | undefined;
      allkeysArr.forEach((_kArr) => {
        if (!_key) {
          _key = _kArr.find(
            (k) => k.keyCode === pressedKey || k.key === pressedKey
          );
        }
        return;
      });
      if (_key) {
        switch (_key.type) {
          case "number":
            handleNumericClicks(_key);
            break;
          case "operator":
            console.log("its an operator:");
            handleOperatorButtonClick(_key);
            break;
          case "control":
            handleControlButtonClick(_key);
            break;
          case "modifier":
            if (_key.keyCode === "F9") handleNumericClicks(_key);
            else handleOperatorButtonClick(_key);
            break;
          default:
            break;
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [expression, result]);

  const expressionRef = useRef(expression);
  useEffect(() => {
    expressionRef.current = expression;
  }, [expression]);

  const handleNumericClicks = ({ key, name }: CalculatorKey) => {
    if (isCalculated) {
      setResult(0);
      setExpression("");
      setIsCalculated(false);
    }
    if (name === "ChangeSign") {
      setExpression((prev) =>
        sign ? (prev.charAt(0) !== "-" ? "-" + prev : String(Number(prev)*(-1))) : prev
      );
      setSign((prev) => !prev);
    } else if (key) setExpression((prev) => prev + key);
  };

  const handleControlButtonClick = (_key: CalculatorKey) => {
    const { name } = _key;
    if (name === "Clear") {
      setExpression("");
      setResult(0);
    } else if (name === "Backspace") {
      if (isCalculated) {
        setIsCalculated(false);
      }
      setExpression((prev) => prev.slice(0, -1));
    } else if (name === "Percent") {
      handleOperatorButtonClick(_key);
    }
  };

  const handleOperatorButtonClick = ({ key, name }: CalculatorKey) => {
    switch (name) {
      case "Add":
      case "Subtract":
      case "Multiply":
      case "Divide":
      case "Percent":
      case ".":
        if (isCalculated) {
          setExpression(result.toString());
          setIsCalculated(false);
        }
        setExpression((prev) => {
          const lastChar = prev.charAt(prev.length - 1);
          return operatorKeys.some((_key) => lastChar === _key.key)
            ? prev.slice(0, -1) + key
            : prev + key;
        });
        break;
      case "Equal":
      case "Enter":
        setTimeout(() => {
          setResult(calculate());
          setIsCalculated(true);
        }, 0);
        break;
    }
  };

  const calculate = () => {
    if (!expression) return 0;

    const sanitized = expression
      .replace(/x/g, "*")
      .replace(/÷/g, "/")
      .replace(/%/g, "/100");

    try {
      const result = new Function(`return ${sanitized}`)();
      return typeof result === "number" && !isNaN(result) ? result : 0;
    } catch {
      return 0;
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full space-y-5 p-5 h-screen transition-all duration-300">
      <h1>Calculator</h1>
      <div className="h-[532px] max-h-[620px] w-3/5 max-w-[292px] py-5 px-3 pb-10 flex flex-col items-center justify-center gap-4 border border-gray-700 rounded-xl bg-gray-600 shadowinner shadow-xl">
        <CalculatorDisplay expression={expression} result={result} />
        <CalculatorKeypad
          onNumKeyClick={handleNumericClicks}
          onContolKeyClick={handleControlButtonClick}
          onOperatorKeyClick={handleOperatorButtonClick}
        />
      </div>
      <p className="text-sm text-white/80 self-center relative bottom-18">
        CASIO
      </p>
    </div>
  );
};

export default Calculator;

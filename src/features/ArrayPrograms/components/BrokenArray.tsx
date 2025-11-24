import React from "react";
import { number } from "yup";

const BrokenArray = () => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [selectedValue, setSelectedValue] = React.useState<string>("");
  const [result, setResult] = React.useState<number[][]>([]);

  const brokenArray = (arr: number[]) => {
    setSelectedValue(arr.toString());
    const output: number[][] = [];
    const sortedArr = arr.sort((a, b) => a - b);
    let tempArr: number[] = [sortedArr[0]];
    for (let i = 1; i < sortedArr.length; i++) {
      if (
        sortedArr[i] === sortedArr[i - 1] ||
        sortedArr[i - 1] + 1 === sortedArr[i]
      ) {
        tempArr.push(sortedArr[i]);
      } else {
        output.push(tempArr);
        tempArr = [sortedArr[i]];
      }
    }
    output.push(tempArr);
    return output;
  };

  const submitBrokenArray = () => {
    const inputValue: string = inputRef?.current?.value || "";

    if (inputValue) {
      const numArray = inputValue
        ?.split(",")
        .map((num: string) => parseInt(num.trim(), 10));
      const result = brokenArray(numArray);
      console.log("Broken Array Result:", result);
      setResult(result);
    }
  };
  return (
    <div className="grid lg:grid-cols-2 gap-2 lg:gap-5 w-full lg:min-w-2xl mx-auto">
      <div className="flex flex-col gap-2">
        <input
          className="p-3 border rounded-lg"
          type="text"
          ref={inputRef}
          placeholder="Enter Broken Array Elements"
        />
        <button onClick={submitBrokenArray} className="p-3 bg-violet-200">
          Submit
        </button>

        <button
          onClick={() => {
            const testArray = [1, 5, 2, 6, 3, 8, 11, 32];
            const result = brokenArray(testArray);
            setResult(result);
          }}
          className="p-3 bg-green-200"
        >
          Test with Sample Data
        </button>
      </div>
      <pre className="p-4 bg-gray-900 text-green-300 rounded-lg overflow-x-auto text-sm">
        Input: {selectedValue || "[]"}
        <br />
        Output: {JSON.stringify(result)}
      </pre>
    </div>
  );
};

export default BrokenArray;

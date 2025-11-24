import React from "react";

const ThreeSumArray = () => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [result, setResult] = React.useState<number[] | string>([]);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const targetRef = React.useRef<HTMLInputElement>(null);

  const threeSumArray = (arr: number[], target: number): number[] => {
    const flattenResult: number[] = [];

    return flattenResult;
  };

  const submitThreeSumArray = () => {
    if (inputRef.current) {
      const val = inputRef.current.value;
      setInputValue(val);
      try {
        const parsedArray = JSON.parse(val) as number[];
        const flattened = threeSumArray(parsedArray, 0); // Assuming target is 0 for now
        setResult(flattened);
      } catch (error) {
        setResult("Invalid input");
        console.error("Error parsing input:", error);
      }
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-2 lg:gap-5 w-full lg:min-w-2xl mx-auto">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            className="p-3 border rounded-lg"
            type="text"
            ref={inputRef}
            placeholder="Enter an array e.g. [1,2,4,8,3]"
          />
          <input
            className="p-3 border rounded-lg"
            type="text"
            ref={targetRef}
            placeholder="Enter target sum e.g. 0"
          />
        </div>

        <button
          onClick={() => submitThreeSumArray()}
          className="p-3 bg-violet-200"
        >
          Submit
        </button>

        <button
          onClick={() => {
            const testArray = [1, 5, 7, 8, 11, 32];
            setInputValue(JSON.stringify(testArray));
            const result = threeSumArray(testArray, 0);
            setResult(result);
          }}
          className="p-3 bg-green-200"
        >
          Test with Sample Data
        </button>
      </div>
      <pre className="p-4 bg-gray-900 text-green-300 rounded-lg overflow-x-auto text-sm">
        Input: {inputValue || "[]"}
        <br />
        Output: {JSON.stringify(result)}
      </pre>
    </div>
  );
};

export default ThreeSumArray;

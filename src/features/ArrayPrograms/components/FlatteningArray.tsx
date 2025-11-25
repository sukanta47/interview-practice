import React from "react";

const FlatteningArray = () => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [result, setResult] = React.useState<any[] | string>([]);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const flattenArray = (arr: any[]): any[] => {
    const flattenResult: any[] = [];
    arr.forEach((a) => {
      if (Array.isArray(a)) {
        flattenResult.push(...flattenArray(a));
      } else {
        flattenResult.push(a);
      }
    });
    return flattenResult;
  };

  const submitFlattenArray = () => {
    if (inputRef.current) {
      const val = inputRef.current.value;
      setInputValue(val);
      try {
        const parsedArray = JSON.parse(val) as any[];
        const flattened = flattenArray(parsedArray);
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
        <input
          className="p-3 border rounded-lg"
          type="text"
          ref={inputRef}
          placeholder="Enter nested array e.g. [1,2,[3,4],[5,[6,7]]]"
        />
        <button
          onClick={() => submitFlattenArray()}
          className="p-3 bg-violet-200"
        >
          Submit
        </button>

        <button
          onClick={() => {
            const testArray = [1, 5, [9, 10, [2, 6], 3], 8, 11, 32];
            setInputValue(JSON.stringify(testArray));
            const flattened = flattenArray(testArray);
            setResult(flattened);
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

export default FlatteningArray;

import React from "react";

const FindSecondSmallestElement = () => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [selectedValue, setSelectedValue] = React.useState<string>("");
  const [result, setResult] = React.useState<number>(-1);

  const secondSmallestElement = (arr: number[]) => {
    setSelectedValue(arr.toString());
    let first = Infinity;
    let second = Infinity;
    arr.forEach((a) => {
      if (a < first) {
        second = first;
        first = a;
      } else if (a < second && a !== first) {
        second = a;
      }
    });
    return second === Infinity ? -1 : second;
  };

  const submitFindSecondSmallest = () => {
    const inputValue: string = inputRef?.current?.value || "";

    if (inputValue) {
      const numArray = inputValue
        ?.split(",")
        .map((num: string) => parseInt(num.trim(), 10));
      const result = secondSmallestElement(numArray);
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
          placeholder="Enter Array Elements"
        />
        <button
          onClick={submitFindSecondSmallest}
          className="p-3 bg-violet-200"
        >
          Submit
        </button>

        <button
          onClick={() => {
            const testArray = [1, 5, 2, 6, 3, 8, 11, 32];
            const result = secondSmallestElement(testArray);
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

export default FindSecondSmallestElement;

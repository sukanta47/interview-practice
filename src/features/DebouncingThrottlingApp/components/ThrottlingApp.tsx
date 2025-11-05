import React, { useState } from "react";
import { useThrottle } from "../hooks/useThrottle";
import { Target } from "lucide-react";

const ThrottlingApp = () => {
  const [dataCalled, setDataCalled] = useState(false);
  const [isApiCalling, setIsApiCalling] = useState(false);
  const [normalCount, setNormalCount] = useState(0);
  const [throttleCount, setThrottleCount] = useState(0);

  const getApiData = (setter: () => void, from) => {
    const timeId = setTimeout(() => {
      console.log("get data");
      setter();
      if (from === "normal") setNormalCount((prev) => prev + 1);
      else setThrottleCount((prev) => prev + 1);
    }, 1000);
    return () => {
      clearTimeout(timeId);
      setDataCalled(false);
    };
  };

  const getThrottledFunction = useThrottle(getApiData, 1000);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <button
          className="bg-red-200 text-white p-3"
          onClick={() => {
            setIsApiCalling(true);
            getApiData(() => setIsApiCalling(false), "normal");
          }}
        >
          Normal button
        </button>
        <button
          className="bg-red-200 text-white p-3"
          onClick={() => {
            setDataCalled(true);
            getThrottledFunction(() => setDataCalled(true), "throttle");
          }}
        >
          Throttled button
        </button>
      </div>
      <div className="flex gap-5 items-center">
        <div className="flex gap-2 items-center">
          API Called:
          <div
            className={`${
              isApiCalling
                ? "bg-green-400 text-white"
                : "bg-gray-200 text-black"
            } p-4 w-10 h-10 rounded-full flex justify-center items-center`}
          >
            {normalCount}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          Throttle:
          <div
            className={`${
              isApiCalling
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-purple-600"
            } p-4 w-10 h-10 rounded-full flex justify-center items-center`}
          >
            {throttleCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThrottlingApp;

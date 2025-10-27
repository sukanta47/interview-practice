import {
  Pause,
  Play,
  Redo,
  StopCircle,
  Timer,
  TimerResetIcon,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<undefined | number>(undefined);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleAction = (action: string) => {
    switch (action) {
      case "start":
        setIsTimerStarted(true);
        setIsRunning(true);
        break;
      case "pause":
        setIsRunning(false);
        break;
      case "stop":
        setIsTimerStarted(false);
        setIsRunning(false);
        setTime(0);
        setLaps([]);
        break;
      case "reset":
        setTime(0);
        setLaps([]);
        break;
      case "lap":
        setLaps((prev) => [...prev, time]);
        break;
      default:
        break;
    }
  };

  const formatTime = (time: number) => {
    const hour = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const miliseconds = Math.floor((time % 1000) / 10);
    return `${String(hour).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}:${String(miliseconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center space-y-5">
      <div className="flex items-center gap-2">
        <h1>Stopwatch </h1>
        <Timer size={48} xlinkTitle="stopwatch icon" />
      </div>
      <div className="bg-purple-200 rounded-lg shadow-md p-5 h-52 w-2/3 flex flex-col gap-10 items-center">
        <div className="text-5xl font-mono text-pink-600">
          {formatTime(time)}
        </div>

        <div className="grid grid-cols-4 gap-2">
          {isRunning ? (
            <button
              data-testid="pause-btn"
              aria-label="Pause Button"
              title="Pause"
              onClick={() => handleAction("pause")}
              className="cursor-pointer text-white p-2 bg-yellow-500 rounded-md focus:outline-none focus:ring-0 focus:border-0"
            >
              <Pause />
            </button>
          ) : (
            <button
              data-testid="play-btn"
              aria-label="Play Button"
              title={isTimerStarted ? "Resume" : "Start"}
              onClick={() => handleAction("start")}
              className="cursor-pointer text-white p-2 bg-blue-400 rounded-md focus:outline-none focus:ring-0 focus:border-0"
            >
              <Play />
            </button>
          )}
          <button
            data-testid="stop-btn"
            aria-label="Stop Button"
            onClick={() => handleAction("stop")}
            disabled={!isTimerStarted}
            title="Stop"
            className={`text-white p-2 rounded-md focus:outline-none focus:ring-0 focus:border-0 ${
              isTimerStarted
                ? "bg-red-400 cursor-pointer"
                : "bg-red-300 cursor-not-allowed"
            }`}
          >
            <StopCircle />
          </button>
          <button
            data-testid="reset-btn"
            aria-label="Reset Button"
            title="Reset"
            onClick={() => handleAction("reset")}
            disabled={!isTimerStarted}
            className={`text-white p-2 rounded-md focus:outline-none focus:ring-0 focus:border-0 ${
              isTimerStarted
                ? "bg-gray-500 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <TimerResetIcon />
          </button>
          <button
            data-testid="lap-btn"
            aria-label="Lap Button"
            title="Record Lap"
            disabled={!isRunning}
            onClick={() => isRunning && handleAction("lap")}
            className={`text-white p-2 rounded-md bg-gray-500 cursor-pointer focus:outline-none focus:ring-0 focus:border-0 ${isRunning ? "opacity-100" : "opacity-60 cursor-not-allowed"} ${
              isTimerStarted ? "block" : "hidden"
            }`}
          >
            <Redo />{" "}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Laps</h3>
        {laps?.map((lap, index) => (
          <div key={`lap-${index}`}>
            <span className="mr-3">Lap {index + 1}:</span>
            {formatTime(lap)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stopwatch;

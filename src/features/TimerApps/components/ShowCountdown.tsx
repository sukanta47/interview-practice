import { CircleCheckBig, Pause, Play, StopCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import AlertModal from "../../../components/ui/AlertModal";

interface setSelectedTime {
  time: number;
  handleStop: () => void;
}
const ShowCountdown: React.FC<setSelectedTime> = ({ time, handleStop }) => {
  const [isRunning, setIsRunning] = useState(true);
  const [remaining, setRemaining] = useState(time);
  const [isOpen, setIsOpen] = useState(false);
  const intervalRef = useRef(0);

  useEffect(() => {
    if (remaining <= 0) return;
    intervalRef.current = setInterval(() => {
      if (isRunning) {
        setRemaining((prev: number) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      } else {
        clearInterval(intervalRef.current);
      }
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [remaining, isRunning]);

  const formatTime = () => {
    const days = Math.floor(remaining / 86400);
    const hours = Math.floor((remaining % 86400) / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    const seconds = remaining % 60;

    return (
      <>
        <span
          id="count-days"
          className="p-5 min-w-24 bg-violet-400 text-white font-semibold rounded-lg shadow-lg"
        >
          {String(days).padStart(2, "0")}d
        </span>
        <span
          id="count-hours"
          className="p-5 min-w-24 bg-violet-400 text-white font-semibold rounded-lg shadow-lg"
        >
          {String(hours).padStart(2, "0")}h
        </span>
        <span
          id="count-minutes"
          className="p-5 min-w-24 bg-violet-400 text-white font-semibold rounded-lg shadow-lg"
        >
          {String(minutes).padStart(2, "0")}m
        </span>
        <span
          id="count-seconds"
          className="p-5 min-w-24 bg-violet-400 text-white font-semibold rounded-lg shadow-lg"
        >
          {String(seconds).padStart(2, "0")}s
        </span>
      </>
    );
  };

  const handleClose = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-violet-200 p-5 rounded-lg shadow-lg min-h-68 w-full">
      {/* Timer Display */}
      <div
        id="countdown-display"
        className="flex flex-wrap justify-center gap-3 text-xl sm:text-2xl md:text-3xl mt-5"
      >
        {formatTime()}
      </div>

      {/* Controls */}
      <div className="flex gap-3 flex-wrap justify-center">
        {remaining ? (
          <button
            className={`text-white p-3 rounded-lg ${
              isRunning ? "bg-yellow-500" : "bg-green-500"
            }`}
            onClick={() => setIsRunning((prev) => !prev)}
            title={isRunning ? "Pause timer" : "Resume timer"}
            id="play-pause-btn"
          >
            {isRunning ? (
              <Pause className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10" />
            ) : (
              <Play className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10" />
            )}
          </button>
        ) : null}

        {remaining ? (
          <button
            className="text-white p-3 rounded-lg bg-red-400"
            onClick={() => {
              setIsOpen(true);
              handleStop();
            }}
            title="Stop timer"
            id="stop-btn"
          >
            <StopCircle className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10" />
          </button>
        ) : (
          <button
            className="text-white p-3 rounded-lg bg-green-600"
            onClick={handleStop}
            title="Done"
            id="done-btn"
          >
            <CircleCheckBig className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10" />
          </button>
        )}
      </div>

      {/* Modal */}
      {isOpen && (
        <AlertModal onClose={handleClose}>
          <div className="p-5 flex justify-center items-center text-center text-base sm:text-lg min-h-28">
            Are you sure you want to end the timer?
          </div>

          <div className="flex justify-end gap-3 flex-wrap">
            <button
              onClick={handleClose}
              className="bg-gray-300 px-4 py-2 text-gray-600 rounded-lg min-w-20"
            >
              Close
            </button>
            <button
              onClick={handleStop}
              className="bg-blue-500 px-4 py-2 text-white rounded-lg min-w-20"
            >
              Ok
            </button>
          </div>
        </AlertModal>
      )}
    </div>
  );
};

export default React.memo(ShowCountdown);

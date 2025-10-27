import { Hourglass } from "lucide-react";
import React, { useState } from "react";
import ShowCountdown from "./ShowCountdown";

const Countdown = () => {
  const [mode, setMode] = useState("duration");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [timerDetails, setTimerDetails] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const[date] = useState(new Date());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof timerDetails
  ) => {
    const value = Number(e.target.value);

    setTimerDetails((prev) => {
      const updated = { ...prev, [field]: value };
      const valArr = Object.values(updated);
      const _isDisabled = !valArr.some((val) => val > 0);
      setIsButtonDisabled(_isDisabled);
      return updated;
    });
  };

  const handleSubmit = () => {
    console.log({ timerDetails });
    setSelectedTime(
      timerDetails.days * 86400 +
        timerDetails.hours * 3600 +
        timerDetails.minutes * 60 +
        timerDetails.seconds
    );
  };
  const handleStop = () => {
    setIsButtonDisabled(true);
    setSelectedTime(null);
    setTimerDetails({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  };
  const handleDateChange = ()=>{

  }
  return (
    <div className="flex flex-col items-center text-violet-600 gap-10">
      <div className="flex items-center gap-2">
        <h1>Countdown Timer </h1>
        <Hourglass size={48} xlinkTitle="Hourglass icon"/>
      </div>
      {!selectedTime ? (
        <div className="bg-violet-200 rounded-lg shadow-md p-5 h-64 w-2/3 flex flex-col items-center">
          <div className="flex flex-col items-center gap-5 w-full">
            <nav className="flex gap-1 justify-start w-full bg-violet-300 p-2">
            <button
                className={`px-4 shadow-md ${
                  mode === "duration"
                    ? "bg-violet-600 border-1 border-red-900"
                    : "bg-violet-300"
                } text-white text-sm border-none outline-none`}
                onClick={() => setMode("duration")}
              >
                Use Duration
              </button>
              <button
                className={`px-4 shadow-md ${
                  mode === "date"
                    ? "bg-violet-600 border-1 border-red-900"
                    : "bg-violet-300"
                } text-white text-sm border-none outline-none`}
                onClick={() => setMode("date")}
              >
                Use Date
              </button>
            </nav>
            <form className="flex flex-col gap-2">
              {mode === "date" ? (
                <>
                  <label
                    htmlFor="date"
                    className="text-sm font-semibold text-violet-600"
                  >
                    Select Date:{" "}
                    <input
                      className="border border-violet-400 rounded-md py-2 px-4 bg-violet-400 text-white focus:ring-0 focus:outline-none"
                      name="date"
                      type="date"
                      value={String(date)}
                      onChange={handleDateChange}
                    ></input>
                  </label>
                  <label
                    htmlFor="time"
                    className="text-sm font-semibold text-violet-600"
                  >
                    Select Time:{" "}
                    <input
                      className="border border-violet-400 rounded-md py-2 px-4 bg-violet-400 text-white focus:ring-0 focus:outline-none"
                      name="time"
                      type="time"
                    ></input>
                  </label>
                </>
              ) : (
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col items-center">
                    <input
                      className="py-4 pl-3 pr-1 text-white bg-violet-400 font-semibold w-18 border-2 border-violet-600 rounded-lg shadow-md focus:outline-none focus:ring-0"
                      type="number"
                      name="days"
                      min={0}
                      max={365}
                      value={String(timerDetails.days).padStart(2, `0`)}
                      onChange={(e) => handleChange(e, "days")}
                    />
                    <label className="text-sm font-semibold text-violet-600">
                      Days
                    </label>
                  </div>
                  <div className="flex flex-col items-center">
                    <input
                      className="py-4 pl-3 pr-1 text-white bg-violet-400 font-semibold w-18 border-2 border-violet-600 rounded-lg shadow-md focus:outline-none focus:ring-0"
                      type="number"
                      name="hours"
                      min={0}
                      max={23}
                      value={String(timerDetails.hours).padStart(2, `0`)}
                      onChange={(e) => handleChange(e, "hours")}
                    />
                    <label className="text-sm font-semibold text-violet-600">
                      Hours
                    </label>
                  </div>
                  <div className="flex flex-col items-center">
                    <input
                      className="py-4 pl-3 pr-1 text-white bg-violet-400 font-semibold w-18 border-2 border-violet-600 rounded-lg shadow-md focus:outline-none focus:ring-0"
                      type="number"
                      name="minutes"
                      min={0}
                      max={59}
                      value={String(timerDetails.minutes).padStart(2, `0`)}
                      onChange={(e) => handleChange(e, "minutes")}
                    />
                    <label className="text-sm font-semibold text-violet-600">
                      Minutes
                    </label>
                  </div>
                  <div className="flex flex-col items-center">
                    <input
                      className="py-4 pl-3 pr-1 text-white bg-violet-400 font-semibold w-18 border-2 border-violet-600 rounded-lg shadow-md focus:outline-none focus:ring-0"
                      type="number"
                      name="seconds"
                      id="seconds"
                      min={0}
                      max={59}
                      value={String(timerDetails.seconds).padStart(2, `0`)}
                      onChange={(e) => handleChange(e, "seconds")}
                    />
                    <label className="text-sm font-semibold text-violet-600">
                      Seconds
                    </label>
                  </div>
                </div>
              )}
            </form>
            <button
              className={`px-5 py-2 bg-violet-600 text-white text-sm font-semibold w-24 rounded-lg ${
                !isButtonDisabled ? "opacity-100" : "opacity-50"
              }`}
              disabled={isButtonDisabled}
              onClick={handleSubmit}
            >
              Start
            </button>
          </div>
        </div>
      ) : (
        <ShowCountdown time={selectedTime} handleStop={handleStop} />
      )}
    </div>
  );
};

export default Countdown;

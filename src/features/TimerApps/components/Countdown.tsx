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
  const [date] = useState(new Date());

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
  const handleDateChange = () => {};
  return (
    <div className="flex flex-col items-center text-violet-600 gap-10 px-3 sm:px-0">
      {/* Title + Icon */}
      <div className="flex items-center gap-2">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-violet-600">
          Countdown Timer
        </h1>
        <Hourglass
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
          xlinkTitle="Hourglass icon"
        />
      </div>

      {!selectedTime ? (
        <div className="bg-violet-200 rounded-lg shadow-md p-5 h-auto w-full sm:w-4/5 md:w-2/3 flex flex-col items-center">
          <div className="flex flex-col items-center gap-5 w-full">
            {/* Tab Switch */}
            <nav className="flex flex-wrap gap-2 justify-center w-full bg-violet-300 p-2 rounded-md">
              <button
                className={`px-4 py-2 shadow-md rounded ${
                  mode === "duration" ? "bg-violet-600" : "bg-violet-300"
                } text-white text-sm`}
                onClick={() => setMode("duration")}
              >
                Use Duration
              </button>
              <button
                className={`px-4 py-2 shadow-md rounded ${
                  mode === "date" ? "bg-violet-600" : "bg-violet-300"
                } text-white text-sm`}
                onClick={() => setMode("date")}
              >
                Use Date
              </button>
            </nav>

            {/* Form */}
            <form className="flex flex-col gap-4 w-full items-center">
              {mode === "date" ? (
                <>
                  <label className="text-sm font-semibold text-violet-600 w-full flex flex-col gap-1">
                    Select Date:
                    <input
                      className="border border-violet-400 rounded-md py-2 px-4 bg-violet-400 text-white focus:outline-none"
                      name="date"
                      type="date"
                      value={String(date)}
                      onChange={handleDateChange}
                    />
                  </label>

                  <label className="text-sm font-semibold text-violet-600 w-full flex flex-col gap-1">
                    Select Time:
                    <input
                      className="border border-violet-400 rounded-md py-2 px-4 bg-violet-400 text-white focus:outline-none"
                      name="time"
                      type="time"
                    />
                  </label>
                </>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full justify-items-center">
                  {(
                    [
                      "days",
                      "hours",
                      "minutes",
                      "seconds",
                    ] as (keyof typeof timerDetails)[]
                  ).map((field, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <input
                        className="py-3 pl-3 pr-1 text-white bg-violet-400 font-semibold w-20 border-2 border-violet-600 rounded-lg shadow-md focus:outline-none"
                        type="number"
                        min={0}
                        max={
                          field === "days" ? 365 : field === "hours" ? 23 : 59
                        }
                        value={String(timerDetails[field]).padStart(2, "0")}
                        onChange={(e) => handleChange(e, field)}
                      />
                      <label className="text-sm font-semibold text-violet-600 mt-1 capitalize">
                        {field}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </form>

            {/* Buttons */}
            <button
              className={`px-5 py-2 bg-violet-600 text-white text-sm font-semibold w-28 rounded-lg ${
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

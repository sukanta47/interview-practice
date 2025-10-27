import { useState } from "react";

interface CountdownSwitchProps {
  handleSwitch: (value: boolean) => void;
}

const CountdownSwitch = ({ handleSwitch }: CountdownSwitchProps) => {
  const [switchState, setSwitchState] = useState(false);
  const handleSwitchButton = () => {
    setSwitchState((prev) => !prev);
    handleSwitch(switchState);
  };
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => handleSwitchButton()}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 
          ${switchState ? "bg-pink-500" : "bg-gray-300"}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300
            ${switchState ? "translate-x-6" : "translate-x-1"}`}
        />
      </button>

      <span
        className={`text-sm font-semibold transition-colors duration-300 ${
          switchState ? "text-pink-600" : "text-gray-500"
        }`}
      >
        {switchState ? "ON" : "OFF"}
      </span>
    </div>
  );
};

export default CountdownSwitch;

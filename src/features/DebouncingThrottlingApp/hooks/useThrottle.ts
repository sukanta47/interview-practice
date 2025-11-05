import { useRef } from "react";

export const useThrottle = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay = 500
) => {
  const lastCall = useRef<number>(0);
  return (...args: T) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
        console.log("callabck called",{delay,now,last:lastCall.current})
      callback(...args);
      lastCall.current = now;
    }
  };
};

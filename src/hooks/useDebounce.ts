import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay = 500): T => {
  const [debValue, setDebValue] = useState<T>(value);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);
  return debValue;
};
export default useDebounce;

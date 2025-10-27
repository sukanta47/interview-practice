// import { useRef, useEffect, useCallback } from "react";

// export function useDebounceFn<T extends (...args: any[]) => void>(
//   fn: T,
//   delay = 500
// ): (...args: Parameters<T>) => void {
//   const timeoutRef = useRef<number | undefined>(undefined);

//   const debouncedFn = useCallback(
//     (...args: Parameters<T>) => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//       timeoutRef.current = window.setTimeout(() => {
//         fn(...args);
//       }, delay);
//     },
//     [fn, delay]
//   );

//   // Cleanup timeout on unmount
//   useEffect(() => {
//     return () => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     };
//   }, []);

//   return debouncedFn;
// }


// export default useDebounceFn;

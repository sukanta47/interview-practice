import { Navigate } from "react-router-dom";
import CountdownApp from "./components/Countdown";
import StopwatchApp from "./components/Stopwatch";

export const timerRoutes = [
  {
    index: true,
    element: <Navigate to="stopwatch" replace />,
  },
  {
    path: "stopwatch",
    element: <StopwatchApp />,
  },
  {
    path: "countdown",
    element: <CountdownApp />,
  },
];

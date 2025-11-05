import { Navigate } from "react-router-dom";
import TimerAppTabs from "../features/TimerApps/TimerAppTabs";
import { timerRoutes } from "../features/TimerApps/timerRoutes";
import { formRoutes } from "../features/Forms/formRoutes";
import FormTabs from "../features/Forms/FormTabs";
import DebThrottleTabs from "../features/DebouncingThrottlingApp/DebThrottleTabs";
import TodoApp from "../features/TodoApp/TodoApp";
import ListSwapping from "../features/ListSwapping/ListSwapping";
import { debounceRoutes } from "../features/DebouncingThrottlingApp/debounceRoutes";
import ReactVirtualization from "../features/Virtualization/ReactVirtualization";
import Calculator from "../features/Calculator/Calculator";

export const NavRoutes = [
  {
    index: true,
    element: <Navigate to="timer" replace />,
  },
  {
    path: "timer",
    element: <TimerAppTabs />,
    children: [...timerRoutes],
  },
  {
    path: "forms",
    element: <FormTabs />,
    children: [...formRoutes],
  },
  {
    path: "debouncing-throttling",
    element: <DebThrottleTabs />,
    children: [...debounceRoutes],
  },
  {
    path: "todo-list",
    element: <TodoApp />,
  },
  {
    path: "list-swapping",
    element: <ListSwapping />,
  },
  {
    path: "calculator",
    element: <Calculator />,
  },
  {
    path: "context-api",
    element: <ListSwapping />,
  },
  {
    path: "route-app",
    element: <ListSwapping />,
  },
  {
    path: "redux-toolkit",
    element: <ListSwapping />,
  },
  {
    path: "virtualization",
    element: <ReactVirtualization />,
  },
];

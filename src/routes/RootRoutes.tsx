import { Navigate } from "react-router-dom";
import AppLayout from "../components/Layout/Layout";
import TimerAppTabs from "../features/TimerApps/TimerAppTabs";
import { timerRoutes } from "../features/TimerApps/timerRoutes";
import FormTabs from "../features/Forms/FormTabs";
import { formRoutes } from "../features/Forms/formRoutes";
import ListSwapping from "../features/ListSwapping/ListSwapping";
import TodoApp from "../features/TodoApp/TodoApp";

export const RootRoutes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
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
        path:"forms",
        element: <FormTabs/>,
        children:[...formRoutes]
      },
      {
        path: "debouncing",
        element: <TimerAppTabs />,
      },
      {
        path: "todo-list",
        element: <TodoApp />
      },
      {
        path: "list-swapping",
        element: <ListSwapping/>,
      },
      {
        path: "context-api",
        element: <ListSwapping/>,
      },
      {
        path: "route-app",
        element: <ListSwapping/>,
      },
      {
        path: "redux-toolkit",
        element: <ListSwapping/>,
      },
    ],
  },
  {
    path: "/login",
    element: <div>Login page</div>,
  },
  {
    path: "/logout",
    element: <div>Logout page</div>,
  },
];

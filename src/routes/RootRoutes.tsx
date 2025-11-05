import AppLayout from "../components/Layout/Layout";
import { NavRoutes } from "./NavRoutes";

export const RootRoutes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      ...NavRoutes
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

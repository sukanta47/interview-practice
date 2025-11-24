import { ErrorBoundary } from "../components/Layout/ErrorBoundary";
import AppLayout from "../components/Layout/Layout";
import { NavRoutes } from "./NavRoutes";
import ProtectedRoute from "./ProtectedRoute";

export const RootRoutes = [
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [...NavRoutes],
      },
    ],
  },

  {
    path: "/login",
    element: <div className="text-black">Login page</div>,
  },
  {
    path: "/logout",
    element: <div>Logout page</div>,
  },
  {
    path: "*",
    element: <div>Page Not Found</div>,
    errorElement: <ErrorBoundary />,
  },
];

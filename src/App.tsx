import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { RootRoutes } from "./routes/RootRoutes";
import { ErrorBoundary } from "./components/Layout/ErrorBoundary";

function App() {
  const router = createBrowserRouter([...RootRoutes]);
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;

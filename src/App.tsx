import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { RootRoutes } from "./routes/RootRoutes";

function App() {
  const router = createBrowserRouter([...RootRoutes]);
  return (
    <RouterProvider router={router}/>
  );
}

export default App;

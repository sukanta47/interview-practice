import { Navigate } from "react-router-dom";
import DebouncingApp from "./components/DebouncingApp";
import ThrottlingApp from "./components/ThrottlingApp";

export const debounceRoutes = [
    {
        index:true,
        element:<Navigate to="debounce-app" replace/>
    },
    {
        path:"throttling-app",
        element:<ThrottlingApp/>
    },
    {
        path:"debounce-app",
        element:<DebouncingApp/>
    }
]
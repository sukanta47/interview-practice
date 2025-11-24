import React, { lazy } from "react";
import { timerRoutes } from "../features/TimerApps/timerRoutes";
import { formRoutes } from "../features/Forms/formRoutes";
import { debounceRoutes } from "../features/DebouncingThrottlingApp/debounceRoutes";
import { Navigate } from "react-router-dom";
const Products = lazy(() => import("../features/ProductListing/ProductsPage"));
const ProductDetails = lazy(
  () => import("../features/ProductListing/ProductDetails")
);
const ProblemDetails = lazy(
  () => import("../features/ArrayPrograms/ProblemDetails")
);
const ArrayPrograms = lazy(
  () => import("../features/ArrayPrograms/ArrayPrograms")
);
const TimerAppTabs = lazy(() => import("../features/TimerApps/TimerAppTabs"));
const FormTabs = lazy(() => import("../features/Forms/FormTabs"));
const DebThrottleTabs = lazy(
  () => import("../features/DebouncingThrottlingApp/DebThrottleTabs")
);
const TodoApp = lazy(() => import("../features/TodoApp/TodoApp"));
const ListSwapping = lazy(
  () => import("../features/ListSwapping/ListSwapping")
);
const ReactVirtualization = lazy(() =>
  import("../features/Virtualization/ReactVirtualization").then((module) => ({
    default: module.ReactVirtualization,
  }))
);
const InfiniteScroll = lazy(
  () => import("../features/InfiniteScroll/InfiniteScroll")
);
const Calculator = lazy(() => import("../features/Calculator/Calculator"));

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
    path: "products",
    element: <Products />,
  },
  {
    path: "products/:id/details",
    element: <ProductDetails />,
  },
  {
    path: "array-programs",
    element: <ArrayPrograms />,
  },
  {
    path: "array-programs/:programId",
    element: <ProblemDetails />,
  },
  {
    path: "redux-toolkit",
    element: <ListSwapping />,
  },
  {
    path: "virtualization",
    element: <ReactVirtualization />,
  },
  {
    path: "infinite-scroll",
    element: <InfiniteScroll />,
  },
];

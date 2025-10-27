import { Navigate } from "react-router-dom";
import FormikForm from "./components/FormikForm/FormikForm";
import ReactForm from "./components/ReactForm/ReactForm";
import FormikTabs from "./components/FormikForm/FormikTabs";
import FormikHookForm from "./components/FormikForm/FormikHookForm";

export const formRoutes = [
  {
    index: true,
    element: <Navigate to="react-form" replace />,
  },
  {
    path: "react-form",
    element: <ReactForm />,
  },
  {
    path: "formik-forms",
    element: <FormikTabs />,
    children:[
      {
        index:true,
        element:<Navigate to="formik-component" replace/>
      },
      {
        path:"formik-component",
        element:<FormikForm/>
      },
      {
        path:"use-formik-form",
        element: <FormikHookForm/>
      }
    ]
  },
];

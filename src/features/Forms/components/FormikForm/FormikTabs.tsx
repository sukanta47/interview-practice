import { Outlet } from "react-router-dom";
import Navbar, { type NavItems } from "../../../../components/ui/Navbar";

const FormikTabs = () => {
  const formikNavItems: NavItems[] = [
    {
      to: "formik-component",
      title: "Formik Component Form",
    },
    {
      to: "use-formik-form",
      title: "Use Formik Form",
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      <Navbar navItems={formikNavItems} />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default FormikTabs;

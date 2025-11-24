import { Outlet } from "react-router-dom";
import Navbar, { type NavItems } from "../../components/ui/Navbar";

const FormTabs = () => {
  const formNavItems: NavItems[] = [
    {
      to: "uncontrolled-form",
      title: "Uncontrolled Form",
    },
    {
      to: "react-form",
      title: "React Form",
    },
    {
      to: "formik-forms",
      title: "Formik Form",
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      <Navbar navItems={formNavItems} />
      <div className="h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default FormTabs;

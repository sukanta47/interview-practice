import { ErrorMessage, Field } from "formik";
import type { RegistrationFormSchema } from "./FormikForm";

const FormField = ({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: keyof RegistrationFormSchema;
  type?: string;
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="font-semibold text-sm">
        {label} <span className="text-red-600">*</span>
      </label>

      <Field
        id={name}
        name={name}
        type={type}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="border border-blue-400 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
      />

      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default FormField;

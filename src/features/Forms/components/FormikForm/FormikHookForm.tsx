import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
interface RegistrationFormSchema {
  fname: string;
  lname: string;
  email: string;
  age: string;
  phone: string;
  city: string;
  password: string;
  confirmPassword: string;
}
interface FieldProps {
  label: string;
  name: keyof RegistrationFormSchema;
  type?: string;
  formik: any;
}
const FormikHookForm = () => {
  const initialValue: RegistrationFormSchema = {
    fname: "",
    lname: "",
    email: "",
    age: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
  };

  const formValidationSchema = Yup.object({
    fname: Yup.string().required().min(3).max(20),
    lname: Yup.string().required().min(3).max(20),
    email: Yup.string().email().required(),
    age: Yup.number().required().min(5).max(150),
    phone: Yup.string().required().length(10),
    city: Yup.string().required(),
    password: Yup.string()
      .min(8)
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required(),
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: formValidationSchema,
    onSubmit: () => {
      console.log("form submitted", formik.values);
    },
  });

  return (
    <div className="flex flex-col items-center gap-6 px-4">
      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-pink-600">
        Use Formik Form
      </h1>

      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full md:w-3/4 lg:w-1/2 mt-4"
      >
        <FormField label="First Name" name="fname" formik={formik} />
        <FormField label="Last Name" name="lname" formik={formik} />
        <FormField label="Email" name="email" type="email" formik={formik} />
        <FormField label="Age" name="age" formik={formik} />
        <FormField label="Phone" name="phone" formik={formik} />
        <FormField label="City" name="city" formik={formik} />
        <FormField
          label="Password"
          name="password"
          type="password"
          formik={formik}
        />
        <FormField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          formik={formik}
        />

        <button
          type="submit"
          className="col-span-1 sm:col-span-2 bg-green-600 text-white font-semibold py-3 rounded-md hover:bg-green-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormikHookForm;

const FormField = ({ label, name, type = "text", formik }: FieldProps) => {
  const error = formik.touched[name] && formik.errors[name];

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="font-semibold text-sm">
        {label} <span className="text-red-600">*</span>
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={`Enter ${label.toLowerCase()}`}
        className={`border rounded-md px-4 py-2 focus:ring-2 focus:outline-none 
          ${
            error
              ? "border-red-500 focus:ring-red-300"
              : "border-blue-400 focus:ring-blue-300"
          }
        `}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

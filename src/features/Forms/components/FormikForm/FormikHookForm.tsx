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
    fname: Yup.string()
      .required("First name is required")
      .min(3, "First name should be at least 3 characters long")
      .max(20, "First name cannot exceed 20 characters"),
    lname: Yup.string()
      .required("Last name is required")
      .min(3, "First name should be at least 3 characters long")
      .max(20, "First name cannot exceed 20 characters"),
    email: Yup.string().email("Invalid email id").required("Email is required"),
    age: Yup.number()
      .min(5, "Minimum age is 5")
      .max(150, "Age cannot exceed 150")
      .required("Age is required"),
    phone: Yup.string()
      .length(10, "Phone number should be 10 digits")
      .required("Phone number is required"),
    city: Yup.string().required("City is required"),
    password: Yup.string()
      .min(8, "Password must be minimumm 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Password must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: formValidationSchema,
    onSubmit: () => {
      console.log("form submit", formik.values);
    },
  });

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-pink-600">
        Use Formik Form
      </h1>
      <div className="mt-4 overflow-y-auto h-full w-full">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-3 text-violet-800"
          onSubmit={(e) => {
            e.preventDefault();
            formik.submitForm();
          }}
        >
          <div className="grid grid-cols-6">
            <label className="col-span-2" htmlFor="fname">
              First name:<span className="text-red-600">*</span>
            </label>
            <div className="col-span-4">
              <input
                type="text"
                className="border border-1 border-blue-400 rounded-md px-4 py-2 focus:bolder-blue-400 focus:border-2 focus:outline-blue-300"
                name="fname"
                value={formik.values.fname}
                placeholder="Enter first name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors["fname"] && (
                <p className="text-red-400 text-sm">{formik.errors["fname"]}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-6">
            <label htmlFor="lname" className="col-span-2">
              Last name:<span className="text-red-600">*</span>
            </label>
            <div className="col-span-4">
              <input
                type="text"
                className="border border-1 border-blue-400 rounded-md px-4 py-2 focus:bolder-blue-400 focus:border-2 focus:outline-blue-300"
                name="lname"
                value={formik.values.lname}
                placeholder="Enter last name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors["lname"] && (
                <p className="text-red-400 text-sm">{formik.errors["lname"]}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-6">
            <label htmlFor="email" className="col-span-2">
              Email:<span className="text-red-600">*</span>
            </label>
            <div className="col-span-4">
              <input
                type="email"
                className="border border-1 border-blue-400 rounded-md px-4 py-2 focus:bolder-blue-400 focus:border-2 focus:outline-blue-300"
                name="email"
                value={formik.values.email}
                placeholder="Enter your email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors["email"] && (
                <p className="text-red-400 text-sm">{formik.errors["email"]}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-6">
            <label htmlFor="age" className="col-span-2">
              Age:<span className="text-red-600">*</span>
            </label>
            <div className="col-span-4">
              <input
                type="text"
                className="border border-1 border-blue-400 rounded-md px-4 py-2 focus:bolder-blue-400 focus:border-2 focus:outline-blue-300"
                name="age"
                value={formik.values.age}
                placeholder="Enter your age"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors["age"] && (
                <p className="text-red-400 text-sm">{formik.errors["age"]}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-6">
            <label htmlFor="phone" className="col-span-2">
              Phone:<span className="text-red-600">*</span>
            </label>
            <div className="col-span-4">
              <input
                type="phone"
                className="border border-1 border-blue-400 rounded-md px-4 py-2 focus:bolder-blue-400 focus:border-2 focus:outline-blue-300"
                name="phone"
                value={formik.values.phone}
                placeholder="Enter phone number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors["phone"] && (
                <p className="text-red-400 text-sm">{formik.errors["phone"]}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-6">
            <label htmlFor="city" className="col-span-2">
              City:<span className="text-red-600">*</span>
            </label>
            <div className="col-span-4">
              <input
                type="text"
                className="border border-1 border-blue-400 rounded-md px-4 py-2 focus:bolder-blue-400 focus:border-2 focus:outline-blue-300"
                name="city"
                value={formik.values.city}
                placeholder="Enter your city"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors["city"] && (
                <p className="text-red-400 text-sm">{formik.errors["city"]}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-6">
            <label htmlFor="password" className="col-span-2">
              Password:<span className="text-red-600">*</span>
            </label>
            <div className="col-span-4">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                className="border border-1 border-blue-400 rounded-md px-4 py-2 focus:bolder-blue-400 focus:border-2 focus:outline-blue-300"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-400 text-sm">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-6">
            <label htmlFor="confirmPassword" className="col-span-2">
              Confirm Password:<span className="text-red-600">*</span>
            </label>
            <div className="col-span-4">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Enter confirm password"
                className="border border-1 border-blue-400 rounded-md px-4 py-2 focus:bolder-blue-400 focus:border-2 focus:outline-blue-300"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-400 text-sm">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
          </div>
          <button
            className="p-3 bg-green-600 text-white font-semibold w-1/3"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormikHookForm;

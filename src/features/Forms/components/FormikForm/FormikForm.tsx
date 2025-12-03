import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
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

const FormikForm = () => {
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

  const onSubmit = (values: RegistrationFormSchema) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-pink-600">
        Formik Component Form
      </h1>
      <div className="mt-4 overflow-y-auto h-full w-full">
        <Formik
          initialValues={initialValue}
          validationSchema={formValidationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-5 text-violet-800 p-5">
              <div className="flex flex-col">
                <label
                  className="col-span-2 font-semibold text-sm"
                  htmlFor="fname"
                >
                  First name:<span className="text-red-600">*</span>
                </label>
                <Field
                  type="text"
                  className="border border-1 border-blue-400 rounded-md px-4 py-2 focus:bolder-blue-400 focus:border-2 focus:outline-blue-300"
                  name="fname"
                  placeholder="Enter first name"
                />
                <ErrorMessage name="fname" className="text-red-400 text-sm" />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="lname"
                  className="col-span-2 font-semibold text-sm"
                >
                  Last name:<span className="text-red-600">*</span>
                </label>
                <Field
                  type="text"
                  className="border border-1 border-blue-400 rounded-md px-4 py-2 focus:bolder-blue-400 focus:border-2 focus:outline-blue-300"
                  name="lname"
                  placeholder="Enter last name"
                />
                <ErrorMessage name="lname" className="error" />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="col-span-2 font-semibold text-sm"
                >
                  Email:<span className="text-red-600">*</span>
                </label>
                <Field
                  type="email"
                  className="border border-1 border-blue-400 rounded-md px-4 py-2 focus:bolder-blue-400 focus:border-2 focus:outline-blue-300"
                  name="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" className="text-red-400 text-sm" />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="age"
                  className="col-span-2 font-semibold text-sm"
                >
                  Age:<span className="text-red-600">*</span>
                </label>
                <Field
                  type="text"
                  className="border border-1 border-blue-400 rounded-md px-4 py-2 focus:bolder-blue-400 focus:border-2 focus:outline-blue-300"
                  name="age"
                  placeholder="Enter your age"
                />
                <ErrorMessage name="age" className="text-red-400 text-sm" />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="phone"
                  className="col-span-2 font-semibold text-sm"
                >
                  Phone:<span className="text-red-600">*</span>
                </label>
                <Field
                  type="phone"
                  className="border border-1 border-blue-400 rounded-md px-4 py-2 focus:bolder-blue-400 focus:border-2 focus:outline-blue-300"
                  name="phone"
                  placeholder="Enter phone number"
                />
                <ErrorMessage name="phone" className="text-red-400 text-sm" />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="city"
                  className="col-span-2 font-semibold text-sm"
                >
                  City:<span className="text-red-600">*</span>
                </label>
                <Field
                  type="text"
                  className="border border-1 border-blue-400 rounded-md px-4 py-2 focus:bolder-blue-400 focus:border-2 focus:outline-blue-300"
                  name="city"
                  placeholder="Enter your city"
                />
                <ErrorMessage name="city" className="text-red-400 text-sm" />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="col-span-2 font-semibold text-sm"
                >
                  Password:<span className="text-red-600">*</span>
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  className="border border-1 border-blue-400 rounded-md px-4 py-2 focus:bolder-blue-400 focus:border-2 focus:outline-blue-300"
                />
                <ErrorMessage
                  name="password"
                  className="text-red-400 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="confirmPassword"
                  className="col-span-2 font-semibold text-sm"
                >
                  Confirm Password:<span className="text-red-600">*</span>
                </label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Enter confirm password"
                  className="border border-1 border-blue-400 rounded-md px-4 py-2 focus:bolder-blue-400 focus:border-2 focus:outline-blue-300"
                />
                <ErrorMessage
                  name="confirmPassword"
                  className="text-red-400 text-sm"
                />
              </div>
              <button
                className="p-3 bg-green-600 text-white font-semibold w-1/3"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormikForm;

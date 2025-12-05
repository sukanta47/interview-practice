import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormField from "./FormField";

export interface RegistrationFormSchema {
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

  const onSubmit = (values: RegistrationFormSchema) => {
    console.log("Form submit:", values);
  };

  return (
    <div className="flex flex-col items-center gap-6 px-4">
      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-pink-600">
        Formik Component Form
      </h1>

      <div className="mt-4 w-full">
        <Formik
          initialValues={initialValue}
          validationSchema={formValidationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-violet-800 w-full md:w-6/7 lg:w-3/4 mx-auto">
              <FormField label="First Name" name="fname" />
              <FormField label="Last Name" name="lname" />
              <FormField label="Email" name="email" type="email" />
              <FormField label="Age" name="age" />
              <FormField label="Phone" name="phone" type="tel" />
              <FormField label="City" name="city" />
              <FormField label="Password" name="password" type="password" />
              <FormField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="col-span-1 sm:col-span-2 bg-green-600 text-white font-semibold py-3 rounded-md hover:bg-green-700 transition"
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

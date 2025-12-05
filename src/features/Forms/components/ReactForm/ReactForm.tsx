import React, { useEffect, useState, type FormEventHandler } from "react";
import useDebounce from "../../../../hooks/useDebounce";

type RegistrationFormSchema = {
  fname: string;
  lname: string;
  email: string;
  age: string;
  phone: string;
  city: string;
};
type FormErrorSchema = Partial<Record<keyof RegistrationFormSchema, string>>;

const ReactForm = () => {
  const [hasTyped, setHasTyped] = useState(false);
  const initialValue: RegistrationFormSchema = {
    fname: "",
    lname: "",
    email: "",
    age: "",
    phone: "",
    city: "",
  };

  const [formData, setFormData] =
    useState<RegistrationFormSchema>(initialValue);
  const [formError, setFormError] = useState<FormErrorSchema>({
    fname: "",
    lname: "",
    email: "",
    age: "",
    phone: "",
    city: "",
  });
  const debouncedValue = useDebounce(formData, 300);

  useEffect(() => {
    if (!hasTyped) return;
    const errors = validateForm(debouncedValue);
    setFormError(errors);
  }, [debouncedValue]);

  const validateForm = (values: RegistrationFormSchema) => {
    const errors: FormErrorSchema = {};

    if (!values.fname.trim()) errors.fname = "First name is required.";
    if (!values.lname.trim()) errors.lname = "Last name is required.";
    if (!values.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Invalid email format.";
    }

    if (!values.age.trim()) {
      errors.age = "Age is required.";
    } else if (isNaN(Number(values.age)) || Number(values.age) <= 0) {
      errors.age = "Age must be a valid number greater than 0.";
    }

    if (!values.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(values.phone)) {
      errors.phone = "Phone number must be 10 digits.";
    }

    if (!values.city.trim()) errors.city = "City is required.";

    return errors;
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit clicked", formData);
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }
    setFormError({});
    console.log("Form submitted:", formData);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasTyped(true);
    const { value, name } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError)
      setFormError((prev) => {
        const { [name as keyof RegistrationFormSchema]: removed, ...rest } =
          prev;
        return rest;
      });
  };

  return (
    <div className="flex flex-col items-center gap-5 px-4">
      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-pink-600">
        React Form
      </h1>

      <div className="mt-4 overflow-y-auto h-[28rem] w-full">
        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-violet-800 w-full md:w-6/7 lg:w-3/4 mx-auto"
          onSubmit={handleSubmit}
        >
          <FormField
            label="First Name"
            name="fname"
            value={formData.fname}
            error={formError?.fname}
            onChange={handleChange}
          />

          <FormField
            label="Last Name"
            name="lname"
            value={formData.lname}
            error={formError?.lname}
            onChange={handleChange}
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            error={formError?.email}
            onChange={handleChange}
          />

          <FormField
            label="Age"
            name="age"
            value={formData.age}
            error={formError?.age}
            onChange={handleChange}
          />

          <FormField
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            error={formError?.phone}
            onChange={handleChange}
          />

          <FormField
            label="City"
            name="city"
            value={formData.city}
            error={formError?.city}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="col-span-1 sm:col-span-2 py-3 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReactForm;

const FormField = ({
  label,
  name,
  value,
  error,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-semibold text-sm">
        {label} <span className="text-red-600">*</span>
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={`Enter ${label.toLowerCase()}`}
        onChange={onChange}
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

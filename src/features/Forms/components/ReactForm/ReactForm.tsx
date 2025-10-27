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
  const [hasTyped,setHasTyped] =useState(false)
  const initialValue: RegistrationFormSchema = {
    fname: "",
    lname: "",
    email: "",
    age: "",
    phone: "",
    city: "",
  };
  const FieldLabel = {
    fname: "First Name",
    lname: "Last Name",
    email: "Email",
    age: "Age",
    phone: "Phone",
    city: "City",
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

  //   const valuesKeysArray = Object.keys(values) as Array<
  //     keyof RegistrationFormSchema
  //   >;
  //   valuesKeysArray.forEach((_k) => {
  //     if (values[_k] === "") {
  //       setFormError((prev) => ({
  //         ...prev,
  //         [_k]: [`${FieldLabel[_k]} is required`],
  //       }));
  //     } else {
  //       if (_k === "email") {
  //         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
  //           if (formError[_k]?.some((err) => err !== "Invalid email format")) {
  //             setFormError((prev) => ({
  //               ...prev,
  //               [_k]: [...(prev[_k] || []), "Invalid email format"],
  //             }));
  //           }
  //         } else {
  //           setFormError((prev) => {
  //             const { [_k]: removed, ...rest } = prev;
  //             return rest;
  //           });
  //         }
  //       }

  //       if (_k === "age") {
  //         if (isNaN(Number(values.age)) || Number(values.age) <= 0) {
  //           if (
  //             formError[_k]?.some(
  //               (err) => err !== "Age must be a valid number greater than 0."
  //             )
  //           ) {
  //             setFormError((prev) => ({
  //               ...prev,
  //               [_k]: [
  //                 ...(prev[_k] || []),
  //                 "Age must be a valid number greater than 0.",
  //               ],
  //             }));
  //           }
  //         } else {
  //           setFormError((prev) => {
  //             const { [_k]: removed, ...rest } = prev;
  //             return rest;
  //           });
  //         }
  //       }

  //       if (_k === "phone") {
  //         if (!/^\d{10}$/.test(values.phone)) {
  //           if (
  //             formError[_k]?.some(
  //               (err) => err !== "Phone number must be 10 digits."
  //             )
  //           ) {
  //             setFormError((prev) => ({
  //               ...prev,
  //               [_k]: [...(prev[_k] || []), "Phone number must be 10 digits."],
  //             }));
  //           }
  //         } else {
  //           setFormError((prev) => {
  //             const { [_k]: removed, ...rest } = prev;
  //             return rest;
  //           });
  //         }
  //       }
  //       else {
  //         setFormError((prev) => {
  //           const { [_k]: removed, ...rest } = prev;
  //           return rest;
  //         });
  //       }
  //     }
  //   });
  // };
  useEffect(() => {
    if(!hasTyped) return;
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
    <div className="flex flex-col items-center gap-5">
      <h1>React Form</h1>
      <div className="mt-4 overflow-y-auto h-[28rem]">
        <form
          className="flex flex-col gap-3 text-violet-800"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-5">
            <label className="col-span-1" htmlFor="fname">
              First name:<span className="text-red-600">*</span>
            </label>
            <div className="col-span-4">
              <input
                type="text"
                className="border border-1 border-blue-400 rounded-md px-4 py-2 focus:bolder-blue-400 focus:border-2 focus:outline-blue-300"
                name="fname"
                value={formData.fname}
                placeholder="Enter first name"
                onChange={handleChange}
              />
              {formError && formError["fname"] && (
                <p className="text-red-400 text-sm">{formError["fname"]}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-5">
            <label htmlFor="lname" className="col-span-1">
              Last name:<span className="text-red-600">*</span>
            </label>
            <div className="col-span-4">
              <input
                type="text"
                className="border border-1 border-blue-400 rounded-md px-4 py-2 focus:bolder-blue-400 focus:border-2 focus:outline-blue-300"
                name="lname"
                value={formData.lname}
                placeholder="Enter last name"
                onChange={handleChange}
              />
              {formError && formError["lname"] && (
                <p className="text-red-400 text-sm">{formError["lname"]}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-5">
            <label htmlFor="email" className="col-span-1">
              Email:<span className="text-red-600">*</span>
            </label>
            <div className="col-span-4">
              <input
                type="email"
                className="border border-1 border-blue-400 rounded-md px-4 py-2 focus:bolder-blue-400 focus:border-2 focus:outline-blue-300"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={handleChange}
              />
              {formError && formError["email"] && (
                <p className="text-red-400 text-sm">{formError["email"]}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-5">
            <label htmlFor="age" className="col-span-1">
              Age:<span className="text-red-600">*</span>
            </label>
            <div className="col-span-4">
              <input
                type="text"
                className="border border-1 border-blue-400 rounded-md px-4 py-2 focus:bolder-blue-400 focus:border-2 focus:outline-blue-300"
                name="age"
                value={formData.age}
                min={1}
                max={150}
                placeholder="Enter your age"
                onChange={handleChange}
              />
              {formError && formError["age"] && (
                <p className="text-red-400 text-sm">{formError["age"]}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-5">
            <label htmlFor="phone" className="col-span-1">
              Phone:<span className="text-red-600">*</span>
            </label>
            <div className="col-span-4">
              <input
                type="phone"
                className="border border-1 border-blue-400 rounded-md px-4 py-2 focus:bolder-blue-400 focus:border-2 focus:outline-blue-300"
                name="phone"
                value={formData.phone}
                placeholder="Enter phone number"
                onChange={handleChange}
              />
              {formError && formError["phone"] && (
                <p className="text-red-400 text-sm">{formError["phone"]}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-5">
            <label htmlFor="city" className="col-span-1">
              City:<span className="text-red-600">*</span>
            </label>
            <div className="col-span-4">
              <input
                type="text"
                className="border border-1 border-blue-400 rounded-md px-4 py-2 focus:bolder-blue-400 focus:border-2 focus:outline-blue-300"
                name="city"
                value={formData.city}
                placeholder="Enter your city"
                onChange={handleChange}
              />
              {formError && formError["city"] && (
                <p className="text-red-400 text-sm">{formError["city"]}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="p-3 bg-violet-600 text-white font-semibold w-1/3"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReactForm;

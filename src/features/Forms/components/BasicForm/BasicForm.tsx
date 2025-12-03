import React from "react";

const BasicForm = () => {
  const [formObj, setFormObj] = React.useState<
    Record<string, FormDataEntryValue>
  >({});
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formObj = Object.fromEntries(formData.entries());
    setFormObj(formObj);
    console.log("Form submitted:", formObj, formData);
  };
  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-pink-600">
        Uncontrolled form
      </h1>
      <form
        className="flex flex-col gap-3 text-violet-800 w-2/5"
        onSubmit={handleSubmit}
      >
        <div className="">
          <label>
            Name:
            <input
              className="ml-2 col-span-4 p-2"
              type="text"
              name="name"
              placeholder="Enter your name"
            />
          </label>
        </div>

        <div className="">
          <label>
            Email:
            <input
              className="ml-2 col-span-4 p-2"
              type="email"
              name="email"
              placeholder="Enter your email"
            />
          </label>
        </div>

        <button className="p-2 bg-violet-800 text-white rounded" type="submit">
          Submit
        </button>
      </form>
      <div className="bg-gray-400 text-white/70 p-10 min-w-[25rem]">
        <p>Entered form data</p>
        <pre>{JSON.stringify(formObj, null, 2)}</pre>
      </div>
    </div>
  );
};

export default BasicForm;

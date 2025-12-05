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
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full px-4">
      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-pink-600 text-center">
        Uncontrolled Form
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 text-violet-800 w-full sm:w-3/4 md:w-2/3 lg:w-1/3"
      >
        {/* Name field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-semibold text-sm">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            className="border border-gray-400 rounded-md px-4 py-2 focus:ring-2 focus:ring-violet-300 focus:outline-none"
          />
        </div>

        {/* Email field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold text-sm">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="border border-gray-400 rounded-md px-4 py-2 focus:ring-2 focus:ring-violet-300 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="p-2 bg-violet-700 text-white font-semibold rounded-md hover:bg-violet-800 transition"
        >
          Submit
        </button>
      </form>

      {/* Display submitted data */}
      <div className="bg-gray-700 text-white p-4 rounded-md w-full sm:w-3/4 md:w-2/3 lg:w-1/3 shadow-md">
        <p className="font-semibold mb-2 text-lg">Entered Form Data:</p>
        <pre className="whitespace-pre-wrap break-all">
          {Object.keys(formObj).length ? JSON.stringify(formObj, null, 2) : "—"}
        </pre>
      </div>
    </div>
  );
};

export default BasicForm;

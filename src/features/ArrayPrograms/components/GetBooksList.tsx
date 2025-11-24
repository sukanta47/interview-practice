import React from "react";

const GetBooksList = () => {
  const [output, setOutput] = React.useState<string[]>([]);
  const input = [
    {
      Name: "chethan",
      Age: "21",
      Books: ["physics", "Chemistry", "Maths"],
      Score: [
        { subject: "physics", marks: "100" },
        { subject: "physics", marks: "100" },
      ],
    },
    {
      Name: "ranjith",
      Age: "21",
      Books: ["Social", "Accounts", "maths", "physics"],
      Score: [
        { subject: "physics", marks: "100" },
        { subject: "physics", marks: "100" },
      ],
    },
  ];

  const getBookList = () => {
    const result = input.reduce((acc: string[], curr) => {
      curr.Books.forEach((book) => {
        if (!acc.includes(book.toLowerCase())) {
          acc.push(book.toLowerCase());
        }
      });
      return acc;
    }, []);
    setOutput(result);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-2 lg:gap-5 w-full lg:min-w-2xl mx-auto">
      <div className="flex flex-col gap-2">
        <button className="p-3 bg-violet-200" onClick={() => getBookList()}>
          Get Book list
        </button>
      </div>
      <pre className="p-4 bg-gray-900 text-green-300 rounded-lg overflow-x-auto text-sm">
        Input: {JSON.stringify(input) || "[]"}
        <br />
        Output: {JSON.stringify(output)}
      </pre>
    </div>
  );
};

export default GetBooksList;

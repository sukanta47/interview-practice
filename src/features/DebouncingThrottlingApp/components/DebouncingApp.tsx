import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../../../hooks/useFetch";
import { XCircle } from "lucide-react";

export type Todo = { id: number; title: string; completed: boolean };

const DebouncingApp = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 400); // optional: add delay param
  const [filteredData, setFilteredData] = useState<Todo[]>([]);
  const { data, isLoading } = useFetch<Todo[]>(
    "https://jsonplaceholder.typicode.com/todos"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clearInput = () => setValue("");

  useEffect(() => {
    if (data) setFilteredData(data);
  }, [data]);

  useEffect(() => {
    if (!data) return;

    const search = debouncedValue.toLowerCase().trim();

    if (!search) {
      setFilteredData(data);
      return;
    }

    const results = data.filter((todo) =>
      todo.title.toLowerCase().includes(search)
    );

    setFilteredData(results);
  }, [debouncedValue, data]);

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="grid lg:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm text-violet-700">
            Search:
          </label>
          <div className="flex gap-2 md:gap-4">
            <input
              value={value}
              className="flex-1 border-2 rounded-lg max-w-4/5 border-blue-300 text-violet-600 p-3 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Search todos..."
              onChange={handleChange}
            />

            {value && (
              <button
                className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                onClick={clearInput}
                title="Clear search"
              >
                <XCircle className="size-5 md:size-6 lg:size-8" />
              </button>
            )}
          </div>
        </div>

        {/* Normal + Debounced Value */}
        <div className="flex flex-col justify-center gap-1 break-all">
          <span className="text-sm md:text-base lg:text-lg text-gray-600">
            <span className="font-semibold text-pink-600">Normal:</span>{" "}
            {value || "---"}
          </span>

          <span className="text-sm md:text-base lg:text-lg text-gray-500">
            <span className="font-semibold text-pink-600">Debounced:</span>{" "}
            {debouncedValue || "---"}
          </span>
        </div>
      </div>

      {/* Todo Results */}
      <div className="flex flex-col items-center gap-5 w-full">
        <h2 className="text-2xl font-bold text-violet-700">Todos</h2>

        {isLoading ? (
          <p className="text-gray-500 text-lg">Loading...</p>
        ) : (
          <div className="flex flex-col gap-3 w-full">
            {filteredData.length > 0 ? (
              filteredData.map((todo) => (
                <div
                  key={todo.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-2 md:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100"
                >
                  <div className="text-sm md:text-base lg:text-lg text-violet-700 font-medium">
                    {todo.title}
                  </div>

                  <div className="mt-2 sm:mt-0">
                    <span
                      className={`px-3 py-1 rounded-md text-xs md:text-sm font-semibold ${
                        todo.completed
                          ? "bg-green-200 text-green-700"
                          : "bg-yellow-200 text-yellow-700"
                      }`}
                    >
                      {todo.completed ? "Completed" : "New"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center text-gray-500 py-5 text-lg">
                No matching results ❌
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DebouncingApp;

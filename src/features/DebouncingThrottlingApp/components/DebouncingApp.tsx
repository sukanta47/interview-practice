import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../../../hooks/useFetch";

export type Todo = { id: number; title: string; completed: boolean };

const DebouncingApp = () => {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value);
  const [filtereData, setFilteredData] = useState<Todo[]>();
  const { data, isLoading } = useFetch<Todo[]>(
    "https://jsonplaceholder.typicode.com/todos"
  );
  const [isDataLoadin, setDataLoading] = useState(isLoading);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
  };
  useEffect(() => {
    if (data) setFilteredData(data);
  }, [data]);

  useEffect(() => {
    function filterData() {
      if (debouncedValue) {
        const _f = data?.filter((_dat) => _dat.title.includes(debouncedValue));
        console.log({ _f });
        if (_f?.length) setFilteredData(_f);
        else setFilteredData([]);
      } else {
        setFilteredData(data || []);
      }
      setDataLoading(false);
    }
    filterData();
  }, [debouncedValue]);

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2">
        <label>
          Search:
          <input
            className="ml-2 border-2 rounded-lg border-blue-300 text-violet-600 p-3"
            onChange={handleChange}
          />
        </label>
        <div className="flex flex-col justify-center">
            <p>Normal value: {value}</p>
            <p>Debounced value: {debouncedValue}</p>
        </div>
      </div>
      <div className="flex flex-col gap-5 items-center w-full">
        <div className="flex gap-2 items-center text-3xl text-violet-600">Todos</div>
        {isDataLoadin ? (
          <p>loading...</p>
        ) : (
          <div className="flex flex-col gap-2 justify-center w-full">
            {Array.isArray(filtereData) && filtereData.length ? (
              filtereData.map((_dat: Todo, index: number) => (
                <div
                  key={_dat.id || index}
                  className="grid grid-cols-4 gap-2 w-full"
                >
                  <div className="col-span-3">Title: {_dat.title}</div>
                  <div className="">
                    Status: {_dat.completed ? "Completed" : "New"}
                  </div>
                </div>
              ))
            ) : (
              <div>No data</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DebouncingApp;

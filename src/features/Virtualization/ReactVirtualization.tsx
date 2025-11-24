import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { List } from "react-window";
import type { RowComponentProps } from "react-window";

export type Todo = { id: number; title: string; completed: boolean };

type RowProps = { todos: Todo[] };

export const ReactVirtualization = () => {
  const { data, isLoading } = useFetch<Todo[]>(
    "https://mocki.io/v1/3186e7cf-86de-467e-b00f-0580b81ca95c"
  );
  const [isDataLoadin] = useState(isLoading);
  const TodoItem = ({ index, style, todos }: RowComponentProps<RowProps>) => {
    const todo = todos[index];
    return (
      <div
        style={style}
        className="p-2 border-b border-gray-200 flex justify-between"
      >
        <span>{todo.title}</span>
        <span>{todo.completed ? "✅" : "🕓"}</span>
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-5 items-center w-full">
      <div className="flex gap-2 items-center text-3xl text-violet-600">
        React Virtualization - Todos
      </div>
      {isDataLoadin ? (
        <p>loading...</p>
      ) : (
        <div className="flex flex-col gap-2 justify-center w-full">
          <List
            style={{ height: 480, width: "100%" }}
            rowCount={data?.length || 0}
            rowHeight={40}
            rowComponent={TodoItem}
            rowProps={{ todos: data || [] }}
          />
        </div>
      )}
    </div>
  );
};

// export default ReactVirtualization;

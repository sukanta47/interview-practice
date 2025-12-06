import { Plus } from "lucide-react";
import React, { useReducer, useRef, useState } from "react";
import Modal from "../../components/ui/Modal";

type Todo = {
  name: string;
  status: "new" | "inprogress" | "done";
};

type TodoState = {
  todos: Todo[];
};

type TodoAction =
  | { type: "ADD"; payload: Todo }
  | { type: "REMOVE"; payload: number }
  | { type: "UPDATE"; payload: { index: number; status: Todo["status"] } };

const initialState: TodoState = { todos: [] };

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case "ADD":
      return { ...state, todos: [...state.todos, action.payload] };

    case "REMOVE":
      return {
        ...state,
        todos: state.todos.filter((_, i) => i !== action.payload),
      };

    case "UPDATE":
      return {
        ...state,
        todos: state.todos.map((todo, i) =>
          i === action.payload.index
            ? { ...todo, status: action.payload.status }
            : todo
        ),
      };

    default:
      return state;
  }
};

const TodoApp = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [isOpen, setIsOpen] = useState(false);
  const todoRef = useRef<HTMLInputElement>(null);

  const closeModal = () => setIsOpen(false);

  const addNewTodo = () => setIsOpen(true);

  const handleSubmit = () => {
    const name = todoRef.current?.value?.trim();
    if (!name) return;

    dispatch({
      type: "ADD",
      payload: { name, status: "new" },
    });
    if (todoRef.current) todoRef.current.value = "";
    closeModal();
  };

  const updateTodo = (index: number) => {
    dispatch({
      type: "UPDATE",
      payload: { index, status: "done" },
    });
  };

  return (
    <>
      <div className="flex flex-col items-center gap-6 w-full">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-pink-600">
          Todo App
        </h1>

        <div className="mt-4 w-full flex flex-col gap-4">
          {/* CREATE NEW TODO */}
          <div className="p-6 rounded-lg bg-purple-200 text-violet-700 flex items-center justify-between shadow-md">
            <h2 className="text-2xl lg:text-4xl font-semibold">
              Create a new todo
            </h2>
            <button
              className="px-4 py-2 bg-violet-600 text-white flex items-center gap-1 rounded-lg hover:bg-violet-700 transition"
              onClick={addNewTodo}
            >
              <Plus className="transition-all hover:rotate-45" />
              Create
            </button>
          </div>

          {/* TODO LIST */}
          {state.todos.length > 0 && (
            <div className="p-3 md:p-5 bg-purple-200 rounded-lg shadow-md flex flex-col gap-3">
              {state.todos.map((todo, index) => (
                <div
                  key={index}
                  className="px-4 py-3 bg-white/80 flex items-center justify-between rounded-lg shadow"
                >
                  <div className="font-semibold text-lg">{todo.name}</div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm px-2 py-1 rounded bg-gray-200">
                      {todo.status}
                    </span>

                    {todo.status !== "done" && (
                      <button
                        className="px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
                        onClick={() => updateTodo(index)}
                      >
                        Done
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {isOpen && (
        <Modal onClose={closeModal}>
          <div className="min-h-[12rem] flex flex-col gap-5 items-center justify-center p-4">
            <label className="flex flex-col gap-2 w-full">
              <span className="font-semibold">Todo name:</span>
              <input
                ref={todoRef}
                type="text"
                className="border border-yellow-400 p-3 rounded-lg w-full"
                placeholder="Enter todo name"
              />
            </label>

            <button
              className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default TodoApp;

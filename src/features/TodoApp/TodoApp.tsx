import { Plus } from "lucide-react";
import React, { useReducer, useRef, useState } from "react";
import Modal from "../../components/ui/Modal";

type TodoState = {
  name: string;
  status: "new" | "inprogress" | "done";
};
type TodosArray = {
  todos: TodoState[];
};
type TodoAction =
  | { type: "ADD_TODO"; payload: TodoState }
  | { type: "REMOVE_TODO"; payload: string } // payload = name or id
  | {
      type: "UPDATE_TODO";
      payload: { name: string; status: TodoState["status"]; index: number };
    };
const initialState: TodosArray = {
  todos: [],
};
function todoReducer(state: TodosArray, action: TodoAction): TodosArray {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.name !== action.payload),
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo, ind) =>
          ind === action.payload.index
            ? { ...todo, status: action.payload.status }
            : todo
        ),
      };
    default:
      return state;
  }
}
type MyTodoAction =
  | {
      type: "ADD";
      payload: TodoState;
    }
  | {
      type: "REMOVE";
      payload: { name: string; status: TodoState["status"]; index: number };
    }
  | {
      type: "UPDATE";
      payload: { name: string; status: TodoState["status"]; index: number };
    };
const myTodoReducer = (state: TodosArray, action: MyTodoAction): TodosArray => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "REMOVE":
      return {
        ...state,
        todos: [
          ...state.todos.filter(
            (todo, index) => action.payload.index !== index
          ),
        ],
      };
    case "UPDATE":
      return {
        ...state,
        todos: state.todos.map((todo, ind):TodoState => {
          if (action.payload.index === ind) {
            return { ...todo, status: action.payload.status };
          }
          return todo;
        }),
      };
    default:
      return state;
  }
};
const TodoApp = () => {
  const [todoState, todoDispatch] = useReducer(myTodoReducer, initialState);
  const [isOpen, setIsOpen] = useState(false);

  const [state, dispatch] = useReducer(todoReducer, initialState);
  const todoRef = useRef<HTMLInputElement>(null);
  const handleClose = () => {
    setIsOpen((prev) => !prev);
  };
  const handleSubmit = () => {
    todoDispatch({
      type: "ADD",
      payload: {
        name: todoRef?.current?.value || "",
        status: "new",
      },
    });
    handleClose();
  };
  const updateTodo = ({ todo, ind }: { todo: TodoState; ind: number }) => {
    console.log({ todo, ind });
    todoDispatch({
      type: "UPDATE",
      payload: {
        name: todo.name,
        status: "done",
        index: ind,
      },
    });
  };

  const addNewTodo = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-5 w-full">
        <h1>Todo App</h1>
        <div className="mt-4 overflow-y-auto h-full w-full flex flex-col gap-4">
          <div className="p-8 rounded-lg w-full bg-purple-200 text-violet-600 flex items-center justify-between shadow-md">
            <h2 className="text-3xl lg:text-5xl">Create a new todo</h2>
            <button
              className="px-4 py-2 w-auto bg-violet-600 text-white flex rounded-lg"
              onClick={addNewTodo}
            >
              <Plus className="mr-1 transition-all ease-in hover:rotate-45" />
              Create
            </button>
          </div>
          {todoState.todos.length ? (
            <div className="p-5 bg-purple-200 rounded-lg shadow-md flex flex-col gap-2">
              {todoState.todos.map((todo, ind) => (
                <div className="px-4 py-1 w-full flex items-center justify-between text-lg font-semibold bg-white/70 shadow-md rounded-lg">
                  <div className="">{todo.name}</div>
                  <div className="flex gap-2 items-center">
                    <div>{todo.status}</div>
                    <button
                      className="px-5 py-1 bg-blue-300 text-white rounded-lg tex-sm"
                      onClick={() => updateTodo({ todo, ind })}
                    >
                      Done
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      {isOpen && (
        <Modal onClose={handleClose}>
          <div className="min-h-[12rem] flex flex-col gap-5 items-center justify-center">
            <label>
              Todo name:
              <input
                className="ml-2 border border-yellow-400 p-3"
                type="text"
                ref={todoRef}
                placeholder="enter todo name"
                name="todotitle"
              />
            </label>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default TodoApp;

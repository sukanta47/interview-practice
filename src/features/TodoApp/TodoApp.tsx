import { Plus } from "lucide-react";
import React, { useReducer, useRef, useState } from "react";
import Modal from "../../components/ui/Modal";

const initialState = {
  todos: [],
};
function todoReducer(state, action) {
    switch (action.type) {
        case "ADD_TODO":
            
            break;
            case "REMOVE_TODO":
            
            break;
            case "UPDATE_TODO":
            
            break;
        default:
            break;
    }
}
const TodoApp = () => {
  //   const [todos, setTodos] = useState();

  const [state, dispatch] = useReducer(todoReducer, initialState);
  const todoRef = useRef(null);
  const handleClose = () => {};
  const handleSubmit = () => {};
  return (
    <>
      <div className="flex flex-col items-center gap-5 w-full">
        <h1>Todo App</h1>
        <div className="mt-4 overflow-y-auto h-full w-full">
          <div className="p-8 rounded-lg w-full bg-purple-200 text-violet-600 flex items-center justify-between shadow-md">
            <h2 className="text-5xl">Create a new todo</h2>
            <button className="px-4 py-2 w-auto bg-violet-600 text-white flex rounded-lg">
              <Plus className="mr-1 transition-all ease-in hover:rotate-45" />
              Create
            </button>
          </div>
          <div></div>
        </div>
      </div>
      <Modal onClose={handleClose}>
        <label>
          Todo name:
          <input
            type="text"
            ref={todoRef}
            placeholder="enter todo name"
            name="todotitle"
          />
        </label>
        <button onClick={handleSubmit}></button>
      </Modal>
    </>
  );
};

export default TodoApp;

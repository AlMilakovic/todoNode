import { setTodos, todos } from "./todos";
import { ToDo } from "./types";

export function saveTodo(toDo: ToDo) {
  try {
    todos.push(toDo);
  } catch (error) {
    console.log(error);
  }
}

export function deleteTodo(toDo: ToDo) {
  try {
    const newTodos = todos.filter((todo: ToDo) => todo.id !== toDo.id) as [
      ToDo
    ];

    setTodos(newTodos);
  } catch (error) {
    console.log(error);
  }
}

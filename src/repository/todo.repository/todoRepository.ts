import { todos } from "./todos";
import { ToDo } from "./types";

export function saveTodo(toDo: ToDo) {
  todos.push(toDo);
}

export function deleteTodo(toDo: ToDo) {
  const index = todos.findIndex((todo: ToDo) => todo.id === toDo.id);

  return todos.splice(index, 1);
}

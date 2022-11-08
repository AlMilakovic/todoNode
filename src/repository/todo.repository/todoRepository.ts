import { setTodos, todos } from "./todos";
import { ToDo } from "./types";
import { err, ok } from "neverthrow";

export function saveTodo(toDo: ToDo) {
  try {
    todos.push(toDo);
    return ok("OK");
  } catch (error) {
    console.log(error);

    return err("Something went wrong");
  }
}

export function deleteTodo(toDo: ToDo) {
  try {
    const newTodos = todos.filter((todo: ToDo) => todo.id !== toDo.id) as [
      ToDo
    ];

    setTodos(newTodos);
    return ok("OK");
  } catch (error) {
    console.log(error);
    return err("Something went wrong");
  }
}

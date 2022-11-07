import { ToDo } from "../../repository/todo.repository/types";
import { v4 as uuidv4 } from "uuid";
import { todos } from "../../repository/todo.repository/todos";
import { newToDoDto } from "../../routes/dto/newToDoDto";

export function validateBody(body: newToDoDto) {
  if (!body) {
    return { error: "Missing body" };
  }
  if (!body.title) {
    return { error: "Missing title" };
  }
  if (!body.description) {
    return { error: "Missing description" };
  }
}

export function createToDo(title: string, description: string): ToDo {
  const id = uuidv4();
  const createdDate = new Date().toUTCString();
  const toDo: ToDo = {
    title,
    description,
    id,
    createdDate,
  };
  return toDo;
}

export default function getToDo(id: string): ToDo {
  let toDo = null;
  toDo = todos.find((todo: ToDo): boolean => todo?.id === id) as ToDo;

  return toDo;
}

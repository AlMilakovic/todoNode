import getToDos from "../../repository/todo.repository/todoRepository";
import { NewToDoDto, ToDo } from "../../repository/todo.repository/types";
import { v4 as uuidv4 } from "uuid";

export function validateBody(body: NewToDoDto) {
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

export function createToDoObject(title: string, description: string) {
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

export default async function getToDo(id: string) {
  const todos = await getToDos();
  let toDo = null;
  toDo = todos.find((todo: ToDo): boolean => todo.id === id) as ToDo;

  if (!toDo) {
    return { message: "Can not find any todo with provided id", data: null };
  }

  return { data: toDo, message: "succes" };
}

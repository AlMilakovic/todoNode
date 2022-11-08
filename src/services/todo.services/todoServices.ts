import { ToDo } from "../../repository/todo.repository/types";
import { v4 as uuidv4 } from "uuid";
import { todos } from "../../repository/todo.repository/todos";
import { NewToDoDto } from "../../routes/dto/newToDoDto";
import { err, ok } from "neverthrow";

export function validateBody(body: NewToDoDto) {
  if (Object.keys(body).length === 0) {
    return err("Missing body");
  }
  if (!body.title) {
    return err("Missing title");
  }
  if (!body.description) {
    return err("Missing description");
  }
  return ok("OK");
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

export default function getToDo(id: string): ToDo | undefined {
  let toDo = null;
  toDo = todos.find((todo: ToDo): boolean => todo?.id === id);

  return toDo;
}

import { ToDo } from "../../repository/todo.repository/types";
import { v4 as uuidv4 } from "uuid";
import { todo } from "../../database/models/todos";
import { err, ok, Result } from "neverthrow";

export type CreateToDoError = "TODO_CREATION_ERROR";

export type GetToDoError = "TODO_NOT_FOUND";

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

export default async function getToDo(
  id: string
): Promise<Result<ToDo, GetToDoError>> {
  let toDo = null;

  toDo = (await todo.findOne({ id })) as ToDo;

  if (!toDo) {
    return err("TODO_NOT_FOUND");
  }
  return ok(toDo);
}

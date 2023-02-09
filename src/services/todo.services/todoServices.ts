import { ToDo } from "../../repository/todo.repository/types";
import { v4 as uuidv4 } from "uuid";
import { todo } from "../../database/models/todos";
import { err, ok, Result } from "neverthrow";
import { saveToDo } from "../../repository/todo.repository/todoRepository";
import { deleteToDo as removeToDo } from "../../repository/todo.repository/todoRepository";

export type GetToDoError = "TODO_NOT_FOUND";

export async function createToDo(
  title: string,
  description: string
): Promise<Result<ToDo, string>> {
  const id = uuidv4();
  const createdDate = new Date().toUTCString();
  const toDo: ToDo = {
    title,
    description,
    id,
    createdDate,
    userId: "random@email.com",
  };
  const resultSave = await saveToDo(toDo);
  if (resultSave.error) {
    return err(resultSave.error);
  }

  return ok(resultSave.todo as ToDo);
}
export async function deleteToDo(id: string): Promise<Result<string, string>> {
  const deleteResult = await removeToDo(id);
  if (!deleteResult.todo) {
    return err(deleteResult.error);
  }
  return ok("ok");
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

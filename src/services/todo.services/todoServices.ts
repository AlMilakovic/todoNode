import { ToDo } from "../../repository/todo.repository/types";
import { v4 as uuidv4 } from "uuid";
import { todos } from "../../repository/todo.repository/todos";
import { NewToDoDto } from "../../routes/dto/newToDoDto";
import { err, ok, Result } from "neverthrow";

export type CreateToDoError = "TODO_CREATION_ERROR";

export type GetToDoError = "TODO_NOT_FOUND";
export const InputValidationErrors = {
  MISSING_BODY: "MISSING_BODY",
  MISSING_TITLE: "MISSING_TITLE",
  MISSING_DESCRIPTION: "MISSING_DESCRIPTION",
};

export function validateBody(body: NewToDoDto): Result<string, string> {
  if (Object.keys(body).length === 0) {
    return err(InputValidationErrors.MISSING_BODY);
  }
  if (!body.title) {
    return err(InputValidationErrors.MISSING_TITLE);
  }
  if (!body.description) {
    return err(InputValidationErrors.MISSING_DESCRIPTION);
  }
  return ok("OK");
}

export function createToDo(
  title: string,
  description: string
): Result<ToDo, CreateToDoError> {
  const id = uuidv4();
  const createdDate = new Date().toUTCString();
  const toDo: ToDo = {
    title,
    description,
    id,
    createdDate,
  };
  if (!toDo) {
    return err("TODO_CREATION_ERROR");
  }
  return ok(toDo);
}

export default function getToDo(id: string): Result<ToDo, GetToDoError> {
  let toDo = null;
  toDo = todos.find((todo: ToDo): boolean => todo?.id === id);
  if (!toDo) {
    return err("TODO_NOT_FOUND");
  }

  return ok(toDo);
}

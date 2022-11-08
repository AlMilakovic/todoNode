import { Router, Request, Response } from "express";
import {
  validateBody,
  createToDo,
} from "../../services/todo.services/todoServices";
import { saveTodo } from "../../repository/todo.repository/todoRepository";
import { Api400Error } from "../../services/error.services/api400Error";
import { Api500Error } from "../../services/error.services/api500Error";
import { httpStatusCodes } from "../../services/error.services/httpStatusCodes";

export function createToDoRouter(): Router {
  const todoRouter = Router();

  return todoRouter.post("/", (req: Request, res: Response) => {
    const inputValidationOutcome = validateBody(req.body);
    if (inputValidationOutcome.isErr()) {
      throw new Api400Error(inputValidationOutcome.error);
    }
    const { title, description } = req.body;
    const toDo = createToDo(title, description);

    const saveOutcome = saveTodo(toDo);
    if (saveOutcome.isErr()) {
      throw new Api500Error(saveOutcome.error);
    }
    return res.status(httpStatusCodes.OK).send({ message: "TO DO CREATED" });
  });
}

import { Router, Request, Response } from "express";
import { todos } from "../../repository/todo.repository/todos";
import { httpStatusCodes } from "../../services/error.services/httpStatusCodes";

export function getToDosRouter(): Router {
  const todoRouter = Router();

  return todoRouter.get("/", (req: Request, res: Response) => {
    return res
      .status(httpStatusCodes.OK)
      .send({ message: "success", data: todos });
  });
}

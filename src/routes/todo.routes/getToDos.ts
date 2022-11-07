import { Router, Request, Response } from "express";
import { todos } from "../../repository/todo.repository/todos";

export function getToDosRouter(): Router {
  const todoRouter = Router();

  return todoRouter.get("/", (req: Request, res: Response) => {
    return res.status(200).send({ message: "success", data: todos });
  });
}

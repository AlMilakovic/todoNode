import { Router, Request, Response } from "express";
import getToDos from "../../repository/todo.repository/todoRepository";

export function todoRouter(): Router {
  const todoRouter = Router();

  return todoRouter.get("/all", async (req: Request, res: Response) => {
    const todos = await getToDos();

    return res.status(200).send({ message: "success", data: todos });
  });
}

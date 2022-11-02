import { Router, Request, Response } from "express";
import getToDo from "../../services/todo.services/todoServices";

export function todoRouter(): Router {
  const todoRouter = Router();

  return todoRouter.get("/:id", async (req: Request, res: Response) => {
    const getToDoOutcome = await getToDo(req.params.id);

    return res
      .status(200)
      .send({ message: getToDoOutcome.message, data: getToDoOutcome.data });
  });
}

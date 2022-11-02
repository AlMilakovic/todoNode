import { Router, Request, Response } from "express";
import getToDo, { getToDoOutcome } from "../../services/todo.services/getToDo";

export function getToDoItem(): Router {
  const getToDoRouter = Router();

  getToDoRouter.get("/:id", async (req: Request, res: Response) => {
    const getToDoOutcome = (await getToDo(req.params.id)) as getToDoOutcome;

    return res
      .status(200)
      .send({ message: getToDoOutcome.message, data: getToDoOutcome.data });
  });

  return getToDoRouter;
}

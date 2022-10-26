import { Router, Request, Response } from "express";
import getToDos from "../../repository/todo.repository/getToDos";

export default function getToDosItems(): Router {
  const getToDosRouter = Router();

  getToDosRouter.get("/todos/all", async (req: Request, res: Response) => {
    const todos: [] = (await getToDos()) as [];

    return res.status(200).send({ message: "success", data: todos });
  });
  return getToDosRouter;
}

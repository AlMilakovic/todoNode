import { Router, Request, Response } from "express";
import getToDos from "../../repository/todo.repository/getToDos";

export default function getToDoItem(): Router {
  const getToDoRouter = Router();

  getToDoRouter.get("/todos/all", async (req: Request, res: Response) => {
    const todos: string = (await getToDos()) as string;

    return res.status(200).send({ message: "success", data: todos });
  });
  return getToDoRouter;
}

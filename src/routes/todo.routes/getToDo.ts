import { Router, Request, Response } from "express";
import getToDo from "../../services/todo.services/todoServices";

export function getToDoRouter(): Router {
  const todoRouter = Router();

  return todoRouter.get("/:id", (req: Request, res: Response) => {
    const toDo = getToDo(req.params.id);

    if (!toDo) {
      return res
        .status(400)
        .send({ message: "Can not find any todo with provided id" });
    }
    return res.status(200).send({ message: "success", data: toDo });
  });
}

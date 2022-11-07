import { Router, Request, Response } from "express";
import { deleteTodo } from "../../repository/todo.repository/todoRepository";
import getToDo from "../../services/todo.services/todoServices";

export function deleteToDoRouter(): Router {
  const todoRouter = Router();
  return todoRouter.delete("/:id", (req: Request, res: Response) => {
    const toDo = getToDo(req.params.id);

    if (!toDo) {
      return res
        .status(400)
        .send({ message: "Can not find any todo with provided id" });
    }

    deleteTodo(toDo);

    return res.status(200).send({ message: "TO DO DELETED" });
  });
}

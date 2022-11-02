import { Router, Request, Response } from "express";
import { deleteTodo } from "../../repository/todo.repository/todoRepository";
import getToDo from "../../services/todo.services/todoServices";

export function todoRouter(): Router {
  const todoRouter = Router();
  return todoRouter.delete("/:id", async (req: Request, res: Response) => {
    const getToDoOutcome = await getToDo(req.params.id);

    if (!getToDoOutcome.data) {
      return res.status(400).send({ message: getToDoOutcome.message });
    }

    const deleteOutcome = await deleteTodo(getToDoOutcome.data);
    if (deleteOutcome?.error) {
      return res.status(400).send({ message: "Something went wrong" });
    }
    return res.status(200).send({ message: "TO DO DELETED" });
  });
}

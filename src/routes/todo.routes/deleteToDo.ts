import { Router, Request, Response } from "express";
import { deleteTodo } from "../../repository/todo.repository/todoRepository";
import { Api404Error } from "../../services/error.services/api404Error.";
import { Api500Error } from "../../services/error.services/api500Error";
import { httpStatusCodes } from "../../services/error.services/httpStatusCodes";
import getToDo from "../../services/todo.services/todoServices";

export function deleteToDoRouter(): Router {
  const todoRouter = Router();
  return todoRouter.delete("/:id", (req: Request, res: Response) => {
    const toDo = getToDo(req.params.id);

    if (!toDo) {
      throw new Api404Error(`ToDo with id: ${req.params.id} not found`);
    }

    const deleteOutcome = deleteTodo(toDo);

    if (deleteOutcome.isErr()) {
      throw new Api500Error(deleteOutcome.error);
    }
    return res.status(httpStatusCodes.OK).send({ message: "TO DO DELETED" });
  });
}

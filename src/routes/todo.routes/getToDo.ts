import { Router, Request, Response } from "express";
import { Api404Error } from "../../services/error.services/api404Error.";
import { httpStatusCodes } from "../../services/error.services/httpStatusCodes";
import getToDo from "../../services/todo.services/todoServices";

export function getToDoRouter(): Router {
  const todoRouter = Router();

  return todoRouter.get("/:id", (req: Request, res: Response) => {
    const toDo = getToDo(req.params.id);

    if (!toDo) {
      throw new Api404Error(`ToDo with id: ${req.params.id} not found`);
    }
    return res
      .status(httpStatusCodes.OK)
      .send({ message: "success", data: toDo });
  });
}

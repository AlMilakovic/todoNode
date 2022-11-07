import { Router, Request, Response } from "express";
import {
  validateBody,
  createToDo,
} from "../../services/todo.services/todoServices";
import { saveTodo } from "../../repository/todo.repository/todoRepository";

export function createToDoRouter(): Router {
  const todoRouter = Router();

  return todoRouter.post("/", (req: Request, res: Response) => {
    const bodyValidationResult = validateBody(req.body);
    if (bodyValidationResult?.error) {
      return res.status(400).send({ error: bodyValidationResult.error });
    }
    const { title, description } = req.body;
    const toDo = createToDo(title, description);
    saveTodo(toDo);

    return res.status(200).send({ message: "TO DO CREATED" });
  });
}

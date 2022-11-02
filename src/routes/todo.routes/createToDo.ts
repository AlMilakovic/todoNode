import { Router, Request, Response } from "express";
import {
  validateBody,
  createToDoObject,
} from "../../services/todo.services/createToDo";
import { saveTodo } from "../../repository/todo.repository/saveToDo";

export default function createToDoItem(): Router {
  const createToDoRouter = Router();

  return createToDoRouter.post("/", async (req: Request, res: Response) => {
    const bodyValidationResult = validateBody(req.body);
    if (bodyValidationResult?.error) {
      return res.status(400).send({ error: bodyValidationResult.error });
    }
    const { title, description } = req.body;
    const toDo = createToDoObject(title, description);
    const saveOutcome = await saveTodo(toDo);
    if (saveOutcome?.error) {
      return res.status(400).send({ error: saveOutcome.error });
    }
    return res.status(200).send({ message: "TO DO CREATED" });
  });
}

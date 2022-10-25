import { Express, Request, Response } from "express";
import { validateBody, createToDo, saveTodo } from "./services/createToDo";
import getToDos from "./services/getToDos";

export default function (app: Express) {
  app.get("/api/todos", async (req: Request, res: Response) => {
    const toDos: string = (await getToDos()) as string;
    return res.status(200).send({
      message: "success",
      data: toDos,
    });
  });

  app.post("/api/todo", (req: Request, res: Response) => {
    const bodyValidationResult = validateBody(req.body);
    if (bodyValidationResult?.error) {
      return res.status(400).send({ error: bodyValidationResult.error });
    }
    const { title, description } = req.body;
    const toDo = createToDo(title, description);
    const saveOutcome = saveTodo(toDo);
    if (saveOutcome?.error) {
      return res.status(400).send({ error: saveOutcome.error });
    }
    return res.status(200).send({ message: "TO DO CREATED" });
  });
}

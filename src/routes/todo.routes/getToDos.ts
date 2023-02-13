import { Router, Request, Response } from "express";
import { httpStatusCodes } from "../../services/error.services/httpStatusCodes";
import { todo } from "../../database/models/todos";

export function getToDosRouter(): Router {
  const todoRouter = Router();

  return todoRouter.get("/", async (req: Request, res: Response) => {
    const todos = await todo.find({ userId: req?.session?.userId });

    return res
      .status(httpStatusCodes.OK)
      .send({ message: "success", data: todos });
  });
}

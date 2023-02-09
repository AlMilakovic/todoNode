import { Router, Request, Response, NextFunction } from "express";
import { createToDo } from "../../services/todo.services/todoServices";

import { httpStatusCodes } from "../../services/error.services/httpStatusCodes";
import { ToDo } from "../../repository/todo.repository/types";
import { toDoDTOSchema } from "../toDoDTO/toDoDTO";
import { createToDoHandler } from "../../middleware/createToDoHandler";
import { MongoError } from "mongodb";

export function createToDoRouter(): Router {
  const todoRouter = Router();

  return todoRouter.post(
    "/",
    toDoDTOSchema,
    createToDoHandler,
    async (req: Request, res: Response, next: NextFunction) => {
      let todo = {} as ToDo;
      try {
        const { title, description } = req.body;
        (await createToDo(title, description)).match(
          (value) => {
            todo = value;
          },
          (e) => {
            throw new MongoError(e);
          }
        );

        return res
          .status(httpStatusCodes.OK)
          .send({ message: "TO DO CREATED", data: todo });
      } catch (error) {
        next(error);
      }
    }
  );
}

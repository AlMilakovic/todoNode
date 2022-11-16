import { Router, Request, Response, NextFunction } from "express";
import {
  validateBody,
  createToDo,
} from "../../services/todo.services/todoServices";
import { saveTodo } from "../../repository/todo.repository/todoRepository";
import { Api400Error } from "../../services/error.services/api400Error";
import { Api500Error } from "../../services/error.services/api500Error";
import { httpStatusCodes } from "../../services/error.services/httpStatusCodes";
import { ToDo } from "../../repository/todo.repository/types";

export function createToDoRouter(): Router {
  const todoRouter = Router();

  return todoRouter.post(
    "/",
    (req: Request, res: Response, next: NextFunction) => {
      let todo = {} as ToDo;
      try {
        validateBody(req.body).match(
          (value) => {
            console.log(value);
          },
          (e) => {
            throw new Api400Error(e);
          }
        );

        const { title, description } = req.body;
        createToDo(title, description).match(
          (value) => {
            todo = value;
            saveTodo(todo);
          },
          (e) => {
            throw new Api500Error(e);
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

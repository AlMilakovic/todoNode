import { Router, Request, Response, NextFunction } from "express";
import { deleteTodo } from "../../repository/todo.repository/todoRepository";
import { Api404Error } from "../../services/error.services/api404Error";
import { Api500Error } from "../../services/error.services/api500Error";
import { httpStatusCodes } from "../../services/error.services/httpStatusCodes";
import getToDo from "../../services/todo.services/todoServices";
import { ToDo } from "../../repository/todo.repository/types";

export function deleteToDoRouter(): Router {
  const todoRouter = Router();
  return todoRouter.delete(
    "/:id",
    (req: Request, res: Response, next: NextFunction) => {
      try {
        let toDo = {};
        getToDo(req.params.id).match(
          (value) => {
            toDo = value;
            deleteTodo(toDo as ToDo);
          },
          (e) => {
            switch (e) {
              case "TODO_NOT_FOUND":
                throw new Api404Error(e);

              default:
                throw new Api500Error("Something went wrong");
            }
          }
        );

        return res
          .status(httpStatusCodes.OK)
          .send({ message: "TO DO DELETED" });
      } catch (error) {
        console.log(error);
        next(error);
      }
    }
  );
}

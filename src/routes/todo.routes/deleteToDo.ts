import { Router, Request, Response, NextFunction } from "express";

import { Api404Error } from "../../services/error.services/api404Error";
import { httpStatusCodes } from "../../services/error.services/httpStatusCodes";
import getToDo from "../../services/todo.services/todoServices";
import { ToDo } from "../../repository/todo.repository/types";
import { todo } from "../../database/models/todos";

export function deleteToDoRouter(): Router {
  const todoRouter = Router();
  return todoRouter.delete(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let toDo = {} as ToDo;

        (await getToDo(req.params.id)).match(
          (value) => {
            toDo = value;
            todo
              .deleteOne({ id: toDo.id })
              .catch((err) => console.log("err", err));
          },
          (e) => {
            switch (e) {
              case "TODO_NOT_FOUND":
                throw new Api404Error(e);
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

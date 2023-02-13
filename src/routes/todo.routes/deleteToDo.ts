import { Router, Request, Response, NextFunction } from "express";

import { Api404Error } from "../../services/error.services/api404Error";
import { httpStatusCodes } from "../../services/error.services/httpStatusCodes";
import getToDo, { deleteToDo } from "../../services/todo.services/todoServices";
import { ToDo } from "../../repository/todo.repository/types";
import { MongoError } from "mongodb";

export function deleteToDoRouter(): Router {
  const todoRouter = Router();
  return todoRouter.delete(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let toDo = {} as ToDo;

        (await getToDo(req.params.id, req.session?.userId)).match(
          async (value) => {
            toDo = value;
            (await deleteToDo(toDo.id)).match(
              () => {},
              (err) => {
                throw new MongoError(err);
              }
            );
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
          .send({ message: "TO DO DELETED", data: toDo });
      } catch (error) {
        console.log(error);
        next(error);
      }
    }
  );
}

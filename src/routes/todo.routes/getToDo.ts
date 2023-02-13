import { Router, Request, Response, NextFunction } from "express";
import { Api404Error } from "../../services/error.services/api404Error";
import { httpStatusCodes } from "../../services/error.services/httpStatusCodes";
import getToDo from "../../services/todo.services/todoServices";

export function getToDoRouter(): Router {
  const todoRouter = Router();

  return todoRouter.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      let toDo = {};
      try {
        (await getToDo(req.params.id, req.session?.userId)).match(
          (value) => {
            toDo = value;
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
          .send({ message: "success", data: toDo });
      } catch (error) {
        next(error);
      }
    }
  );
}

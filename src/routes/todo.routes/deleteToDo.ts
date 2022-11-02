import { Router, Request, Response } from "express";
import { deleteTodo } from "../../repository/todo.repository/deleteToDo";

export default function deleteToDoItem(): Router {
  const deleteToDoRouter = Router();
  return deleteToDoRouter.delete("/", async (req: Request, res: Response) => {
    await deleteTodo("a8e5ed62-696f-43d6-aa1d-3e447b7852c4");

    // return res.status(200).send({ message: "TO DO DELETED" });
  });
}
